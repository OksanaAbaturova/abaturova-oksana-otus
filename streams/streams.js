const { Transform } = require('node:stream');
const { access } = require('node:fs').promises;
const fs = require('node:fs');

const {argv} = require('process');
const currentFile = argv[2] || 'test.txt';

const readData = async(fileName) => {
    if (fileName) {
        const exists = await access(fileName).then(() => true).catch(() => false);
        if (!exists) {
            console.log('file doesnt exist!');
            return;
        }
        const readStream = fs.createReadStream(fileName, { hightWateMark: 100 });
        const writeStream = fs.createWriteStream(`${__dirname}/output/output.txt`, { encoding: 'utf8' });
        const stringTransform = new Transform({
            transform(chunk, encoding, callback) {
                const transformData = (chunkData) => {
                    let split = chunkData.toString().trim().split(/[\s\n]/);
                    split = split.map(el => el.replace(/[^A-ZА-Яa-zа-я]/, '')).filter(Boolean);
                    split.sort((a,b) => { return a < b ? -1 : 0;});
                    let objVector = {};
                    split.reduce((accum, word) => {
                        accum[word] = (accum[word] || 0) + 1;                            
                        return accum;
                    }, objVector);
                    let vector = Object.values(objVector);
                    return vector.toString();
                };

                try  {
                    callback(null, transformData(chunk));
                }
                catch (err) {
                    callback(err);
                }
            },
        });

        readStream.pipe(stringTransform).pipe(writeStream);
    }
};

readData(currentFile);