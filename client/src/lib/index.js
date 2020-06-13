import mToken from './longmai/mToken';

const token = new mToken("mTokenPlugin");

function enumDevice(type = 'GM3000') {
  return new Promise((resolve, reject) => {
    const slectType = type;
    let ret = 0;
    if (slectType == "GM3000PCSC")
      ret = token.SOF_LoadLibrary(token.GM3000PCSC);
    else if (slectType == "GM3000")
      ret = token.SOF_LoadLibrary(token.GM3000);
    else if (slectType == "K7")
      ret = token.SOF_LoadLibrary(token.K7);
    else if (slectType == "TF")
      ret = token.SOF_LoadLibrary(token.TF);
    else
      ret = token.SOF_LoadLibrary(token.K5);
    if (ret != 0) {
      alert("加载控件失败,错误码:" + token.SOF_GetLastError());
      return;
    }
    const deviceName = token.SOF_EnumDevice();

    if (deviceName != null) {
      resolve(deviceName);
    }

    reject(null)
  });
}

export {
  enumDevice
};