import * as process from 'process';
import {spawn, spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns} from 'child_process';

/**
 * Go to frontend directory (necessary if this script is included through require)
 */
changeToDirectory(__dirname);

// declaring utf8 makes sure a string is returned (as opposed to a buffer) from spawnSync
const spawnSyncOptions: SpawnSyncOptionsWithStringEncoding = {
  encoding: 'utf8'
};

/**
 * Some few adaptions are necessary for making installation work on windows
 */
const isWin = /^win/.test(process.platform);
const spawnSyncCommand = (cmdName): string => {
  return isWin ? `${cmdName}.cmd` : cmdName;
};

installFrontend();

function installFrontend() {
  installGitModules();
  installMainModule();
}

/**
 * Setup git submodules
 */
function installGitModules () {
  const initSubmodules = spawnSync('git', ['submodule', 'init'], spawnSyncOptions);
  handleCommandResult(initSubmodules, {exitOnError: false});
  const updateSubmodules = spawnSync('git', ['submodule', 'update'], spawnSyncOptions);
  handleCommandResult(updateSubmodules, {exitOnError: false}); // git writes to stderr even though everything is ok, so noexit
}

/**
 * Install main module
 */
function installMainModule() {
  const startingDirectory = process.cwd();
  console.log('sd', startingDirectory);
  changeToDirectory(startingDirectory);
  changeToDirectory('main');
  console.log('Installing app. This may take a while...');
  const installModuleDependencies = spawnSync(spawnSyncCommand('npm'), ['install'], spawnSyncOptions);
  handleCommandResult(installModuleDependencies, {exitOnError: false});
}

/**
 * Helper functions
 */
function handleCommandResult(result: SpawnSyncReturns<string>, options?: HandleCommandResultOptions) {
  if (result.error) {
    console.error('ERROR IN PROCESS:', result.error);
    if (options.exitOnError) {
      process.exit()
    }
  } else if (result.stderr !== undefined && result.stderr !== "") {
    console.error('STDERR NOT EMPTY:', result.stderr);
    if (options.exitOnError) {
      process.exit()
    }
  } else {
    console.log(result.stdout);
  }
}

function changeToDirectory (dir) {
  try {
    console.log(`Changing to directory ${dir}`);
    process.chdir(dir);
  } catch (err) {
    console.log(`Could not change to directory ${dir}: ${err}`);
    process.exit();
  }
}

interface HandleCommandResultOptions {
  exitOnError: boolean
}
