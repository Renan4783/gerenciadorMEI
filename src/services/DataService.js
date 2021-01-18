let failedLoadAttempts = 3;
let failedSaveAttempts = 3;

class DataService {

    constructor () {
        this.percent = 0;
    }

    static setValueBuffer(value) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (failedSaveAttempts > 1) {
                    this.percent = value;
                    //console.log(this.percent);
                    resolve();
                } else {
                    Alert.alert('Unable to save data!');
                }
            }, 1);
        });
    }
    
    static getValueBuffer() {
        return new Promise(resolve => {
            setTimeout(() => {
                if (failedLoadAttempts > 1) {
                    resolve(this.percent);
                    //console.log();
                } else {
                    Alert.alert('Unable to load data!');
                }
            }, 1);
        });
    }

}

export default DataService;