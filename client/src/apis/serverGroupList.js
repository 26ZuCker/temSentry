const serverGroupListO = [
  {
    id: 'sg1',
    name: 'sg1',
    serverList: [
      {
        id: 'sg1s1',
        name: 'sg1s1',
        hardwareList: [
          { id: 'sg1s1h1', name: 'sg1s1h1', status: 20, remark: '', threshold: 100, isWarning: false },
          { id: 'sg1s1h2', name: 'sg1s1h2', status: 70, remark: '', threshold: 100, isWarning: false },
          { id: 'sg1s1h3', name: 'sg1s1h3', status: 110, remark: '', threshold: 100, isWarning: false },
        ],
      },
      {
        id: 'sg1s2',
        name: 'sg1s2',
        hardwareList: [
          { id: 'sg1s2h1', name: 'sg1s2h1', status: 10, remark: '', threshold: 80, isWarning: false },
          { id: 'sg1s2h2', name: 'sg1s2h2', status: 20, remark: '', threshold: 80, isWarning: false },
        ],
      },
    ],
  },
  {
    id: 'sg2',
    name: 'sg2',
    serverList: [
      {
        id: 'sg2s1',
        name: 'sg2s1',
        hardwareList: [
          { id: 'sg2s1h1', name: 'sg2s1h1', status: 10, remark: '', threshold: 80, isWarning: false },
          { id: 'sg2s1h2', name: 'sg2s1h2', status: 40, remark: '', threshold: 80, isWarning: false },
        ],
      },
      {
        id: 'sg2s2',
        name: 'sg2s2',
        hardwareList: [
          { id: 'sg2s2h1', name: 'sg2s2h1', status: 20, remark: '', threshold: 80, isWarning: false },
          { id: 'sg2s2h2', name: 'sg2s2h2', status: 20, remark: '', threshold: 80, isWarning: false },
        ],
      },
    ],
  },
];
//放入server内
const serverGroupInfo = {
  temperature: 25,
  humidity: 75,
  pressure: 95,
};

import Taro from '@tarojs/taro';
const serverGroupList = () =>
  Taro.request({
    url: `http://192.168.43.75:5000/gethardware`,
    method: 'GET',
    data: {},
    success: function(res) {
      console.log(res);
    },
    fail: function(error) {
      console.log(error);
    },
  });
export { serverGroupList, serverGroupInfo };
