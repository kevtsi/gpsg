const fs = require('fs');
const clear = require('clear');
const { exec } = require('child_process');

module.exports = (config) => {
    return {
        help: () => {
            console.log(`here is the help.. good luck :)\n`);
            return;
        },
        exit: () => {
            process.exit(0);
        },
        clear: () => clear(),
        version: () => {
            console.log(`${config.name} ${config.version}`);
            return;
        },
        new: (args) => {
            if (args.length == 1) {
                console.log(`-gpsg: new: project name must be specified`);
            } else {
                let project = args[1];
                if (!fs.existsSync(project)) {
                    fs.mkdirSync(project);
                }
                process.chdir(project);
                console.log(`Creating new project ${process.cwd()}`);

                // TODO: find out why this caused node process hang and file lock
                exec(`npm init -y`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(`-gpsg: error creating new project: ${err.message}`);
                    }
                    console.log(`Project ${project} was created successfully`);
                });
            }
            
            return;
        }
    };
};
