const os = require('os');
const chalk = require('chalk');
const inquirer = require('inquirer');

const currentUser = os.userInfo().username;
const hostName = os.hostname();

module.exports = (config) => {
    const promptPrefix = chalk.greenBright(`${currentUser}@${hostName}`) + chalk.bold.red(` ${config.name}`);

    return {
        commandPrompt: () => {        
            return inquirer.prompt([{
                name: 'cmdline',
                type: 'input',
                message: '$',
                prefix: `${promptPrefix}:${chalk.cyan(__dirname)}`
            }]);
        }
    };
};