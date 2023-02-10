import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { JsonRpcSigner } from "@ethersproject/providers";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { Network, Alchemy, AssetTransfersCategory, Wallet, Utils } from "alchemy-sdk";
import useLocalStorage from "../utils/useStorage";
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { ThemeProvider,styled,createTheme,useTheme  } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { BigNumber } from 'ethers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
 
const Home: NextPage = () => {
  const [value, setValue] = useLocalStorage('Mintfactory_indexPageValue', 0);
  const { activateBrowserWallet, deactivate,account, library } = useEthers();
  const [signer, setSigner] = React.useState<undefined | JsonRpcSigner>(undefined);
  const [MintFactorytheme, setMintFactorytheme] = useLocalStorage('MintFactorytheme', 'dark');
  const [rows, setRows] = React.useState([]);
  const [is_whitelist,setis_whitelist] = useLocalStorage('Mintfactory_is_whitelist', 'false');
  const [username,setUsername] = useLocalStorage('Mintfactory_username', '');
  const [usergroup,setUsergroup] = useLocalStorage('Mintfactory_usergroup', '');
  const [timestamp_start,setTimestamp_start] = useLocalStorage('Mintfactory_timestamp_start', '');
  const [timestamp_validate,setTimestamp_validate] = useLocalStorage('Mintfactory_timestamp_validate', '');
  const [timestamp_validate_num,setTimestamp_validate_num] = useLocalStorage('Mintfactory_timestamp_validate_num', '');
  const [logInfoIP,setLogInfoip] = React.useState('');
 
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
 
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const getUserInfo = async () => {
    let res = await fetch('api/getUserInfo?address=' + account )
    let data = await res.json()
    //console.log("data:",data)
    let txs = data.result
    .map((item:any) => {
      return {
        ...item,
        timestamp_start: moment(item.timestamp_start).format('YYYY年MM月DD日 HH时') ,
        timestamp_validate: moment(item.timestamp_validate).format('YYYY年MM月DD日 HH时') ,
        timestamp_validate_num : item.timestamp_validate
      }
    })  
    if(txs==null || txs ==""){
        setis_whitelist('false');
        setUsername("未验证用户");
        setUsergroup('未验证用户分组');
        setTimestamp_start("未验证");
        setTimestamp_validate("未验证");    
        setTimestamp_validate_num("0"); 
       
    }
    else{
      setRows(txs)
      //console.log("txs:",txs)
      txs.map((row:any) => {
        setis_whitelist((row.is_whitelist!==null && row.is_whitelist !=="")?(row.is_whitelist):('false'));
        setUsername((row.username!==null && row.username !=="")?(row.username):("未验证用户"));
        setUsergroup((row.usergroup!==null && row.usergroup !=="")?(row.usergroup):("未验证用户分组"));
        setTimestamp_start((row.timestamp_start !== null && row.timestamp_start !== "")?(row.timestamp_start):("未验证"));
        setTimestamp_validate((row.timestamp_validate !== null && row.timestamp_validate !== "")?(row.timestamp_validate):("未验证"));    
        setTimestamp_validate_num((row.timestamp_validate_num !== null && row.timestamp_validate_num !== "")?(row.timestamp_validate_num):("0"));
 
      })
    }
    
  } 
 
  const getLogInfo = async () => { 
    try{
      // 获取用户的 IP 地址
      fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => { 
            setLogInfoip(data.ip);

            fetch("/api/postLogInfo", {
                method: "POST",
                body: JSON.stringify({ address:account, IP: data.ip}),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
             }); 
      }); 
    }catch(error){
      console.log(error); 
    }
  };
   
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode:any) => (prevMode === 'light' ? 'dark' : 'light'));
        
      },
    }),
    [],
  );

  const setTheme = () => {
    setMintFactorytheme(theme.palette.mode)
    //console.log("MintFactorytheme:",MintFactorytheme)
  }
 
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
 
  React.useEffect(() => { 
    if (account) {
      //console.log(library?.getSigner())
      // @ts-ignore
      setSigner(library?.getSigner());
      getLogInfo(); 
    } else {
     // Deactivate signer if signed out
      setSigner(undefined);
    }
  }, [account]);
 
  React.useEffect(() => {
    if (account) {
      getLogInfo(); 
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getUserInfo();
  };

  const handleConnect = () => {
    activateBrowserWallet();
  }
  
  return (
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
  
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./favicon.ico" />
        
      </Head>
      <AppBar sx={{height: '5vh' }} position="sticky">
          <Toolbar sx={{display:'flex',bgcolor: 'background.default', color: 'text.primary', justifyContent:'space-between'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            > 
            </IconButton>
            <div style={{display:'flex' ,position: 'absolute', top: 8}}>
            <a href=""><img src="./nav.png" alt="" width="270" height="48"/></a>
            </div>
            
            <div style={{display:'flex' ,position: 'absolute', right: 380, top: 13}}>
                <Box> 
                  <IconButton sx={{ ml: 1 }} onClick={
                     async () => {
                    colorMode.toggleColorMode()
                    setTheme()
                     }
                    } color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>
            </div>
      
          </Toolbar>
          
      </AppBar>
 
      {(account && is_whitelist=="true" && usergroup =='admin') ? (
        <Box sx={{ flexGrow: 2 ,bgcolor: 'background.default', color: 'text.primary', display: 'flex',marginTop: 0, height: '95vh'}}>  
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{width: '15vh', borderRight: 2, borderColor: 'divider' }}
            >
              <Tab sx={{ fontSize:'16px', marginBottom: 4 ,marginTop: 10,marginLeft: 0,marginRight: 2}} value={0} label="欢迎登录" />
            
            </Tabs>
            <Box sx={{ margin:'0 auto'}} >
                <TabPanel value={value} index={0}>
                   
                </TabPanel>
            </Box>

          </Box>
      
      )
      :(account && is_whitelist=="true" && usergroup === 'vip' && timestamp_validate_num >  Date.now()) ? (
        <Box sx={{ flexGrow: 2 ,bgcolor: 'background.default', color: 'text.primary', display: 'flex',marginTop: 0, height: '95vh'}}>  
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{width: '15vh', borderRight: 2, borderColor: 'divider' }}
          >
            <Tab sx={{ fontSize:'16px', marginBottom: 4 ,marginTop: 10,marginLeft: 0,marginRight: 2}} value={0} label="欢迎登录" />
       
          </Tabs>
          <Box sx={{ margin:'0 auto'}} >
              <TabPanel value={value} index={0}>
             
              </TabPanel>
          </Box>

        </Box>
      ):
      (account && is_whitelist=="true" && usergroup === 'free' && timestamp_validate_num >  Date.now()) ? (
        <Box sx={{ flexGrow: 2 ,bgcolor: 'background.default',
        color: 'text.primary', display: 'flex',marginTop: 0, height: '95vh'}}>  
              <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{width: '15vh', borderRight: 2, borderColor: 'divider' }}
              >
              <Tab sx={{ fontSize:'16px', marginBottom: 4 ,marginTop: 10,marginLeft: 0,marginRight: 2}} value={0} label="欢迎登录" />
               
              </Tabs>
              <Box sx={{margin:'0 auto'}} >
              <TabPanel value={value} index={0}>
             
              </TabPanel>
              

              </Box>

              </Box>
      )
      :
      (
        <Box sx={{ flexGrow: 2 ,bgcolor: 'background.default',
        color: 'text.primary', display: 'flex',marginTop: 0, height: '95vh'  ,
        justifyContent: "center"}}>  
 
            <div style={{ marginTop: 50 , fontSize: "18px", lineHeight: "30px" }}> {
            (account == null) ? "请先连接钱包" : 
            (is_whitelist == undefined) ? "加载中... 长时间加载请刷新页面": ( 
              <Box  sx={{
                height: '25vh',
                width: '75vh',
                mr: '2vh',
                marginLeft: '0vh',
                mt:10,
                ml:'0vh',
                display: 'flex', 
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                background: 'background.default',
                borderRadius: 2,
                border : '1px solid #404040',
                py: '0',
                color: 'text.secondary' 
              }}> 
                      <Box style={{ display: "flex", justifyContent: "center", fontSize: "18px", lineHeight: "30px" }}>
                       当前链接钱包 :&nbsp;{account}<br/><br/></Box>
                      <Box>暂无访问权限，申请使用请联系 &nbsp; 
                       
                      </Box>
                      <Box>若登陆后仍长时间停留在当前页面，请稍等十秒左右会自动跳转，超过时间请再试下手动刷新  </Box>
              </Box>
                    )}</div>
        </Box>
    )}
 
  
      
    </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Home



