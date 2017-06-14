// Run this with ts-node (https://github.com/TypeStrong/ts-node)

const node_ssh = require('node-ssh');
const ssh = new node_ssh();

interface DeployConfig {
  restartServer: boolean;
  ssh: {
    host: string;
    username: string;
    privateKey: string;
  };
}

const config: DeployConfig = require('./deploy.config');

/**
 * Helper to print some pretty dots during waiting times
 */
let actionFinished = false;
const printDotsDuringAction = () => {
  setTimeout(() => {
    if (!actionFinished) {
      process.stdout.write('.');
      printDotsDuringAction();
    };
  }, 500);
};

// Bundling Angular
console.log('Bundling frontend');
const spawn = require( 'child_process' ).spawn;
const ngBuild = spawn( 'ng', ['build', '--prod'] );

printDotsDuringAction();

let latestData;
ngBuild.stdout.on('data', (data) => {
  latestData = data;
});

ngBuild.stderr.on('data', (data) => {
  latestData = data;
});

ngBuild.on('close', (code) => {

  console.log('');
  console.log(latestData.toString());

  actionFinished = true;

  async function doDeploy() {
    try {

      console.log('connecting to server');
      const sshConnection = await ssh.connect({
        host: config.ssh.host,
        username: config.ssh.username,
        privateKey: config.ssh.privateKey
      });

      await ssh.mkdir('tsmean');

      actionFinished = false;
      printDotsDuringAction();
      console.log('Uploading dist folder: ');
      actionFinished = await ssh.putDirectory('dist', 'tsmean/dist');
      console.log('');

      if (config.restartServer) {
        console.log('Copying additional files');
        await ssh.putFile('server.js', 'tsmean/server.js');
        await ssh.putFile('package.json', 'tsmean/package.json');

        console.log('Install required packages on server');
        await ssh.execCommand('cd tsmean && npm install --production');

        console.log('Starting Forever');
        await ssh.execCommand('forever stop tsmean/server.js');
        await ssh.execCommand('forever start tsmean/server.js');
      }

      console.log('Everything done!');
      ssh.dispose();

    } catch (err) {
      console.log('Error: ', err.message);
    }
  }
  doDeploy();

});
