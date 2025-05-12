import { Box, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useLayoutEffect, useState } from 'react';
import { appVersionAtom } from 'renderer/store';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

const AboutSection = () => {
  const [appVersion, setAppVersion] = useAtom(appVersionAtom);
  const [markdown, setMarkdown] = useState('');

  const handleLink = (siteUrl: any) => {
    window.electron.ipcRenderer.sendMessage('openExternalLink', [siteUrl]);
  };

  const handleOnClick = (e: any) => {
    console.log(e.target.href);
    e.preventDefault();
    handleLink(e.target.href);
  };

  const getData = async () => {
    const { data, status } = await axios
      .get(
        `https://raw.githubusercontent.com/ReStartQ/anicour/main/CHANGELOG.md`,
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log('Error: failed to get theme songs');
        return err;
      });
    console.log(data);
    console.log(typeof data);
    console.log(status);
    if (status === 200) {
      setMarkdown(data);
    }
  };

  useLayoutEffect(() => {
    const removeEventListener = window.electron.ipcRenderer.on(
      'appVersion',
      (arg: any) => {
        console.log('app version');
        setAppVersion(arg[0]);
      },
    );
    window.electron.ipcRenderer.sendMessage('appVersion', ['hi']);
    getData();
    return () => {
      removeEventListener();
    };
  });

  return (
    <Box>
      <Typography variant="subtitle1">Version: {appVersion}</Typography>
      <MDEditor
        value={markdown}
        style={{ marginTop: '10px', marginBottom: '10px', padding: '15px' }}
        height="460px"
        hideToolbar
        contentEditable={false}
        preview="preview"
        enableScroll
        previewOptions={{
          rehypeRewrite: (node: any) => {
            if (node.type === 'element' && node.tagName === 'a') {
              console.log(node);
              node.properties = {
                ...node.properties,
                onClick: handleOnClick,
              };
            }
          },
        }}
      />
    </Box>
  );
};

export default AboutSection;
