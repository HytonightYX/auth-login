import mToken from './longmai/mToken';

const token = new mToken("mTokenPlugin");

function enumDevice(type = 'GM3000') {
  return new Promise((resolve, reject) => {
    const _errcode = token.SOF_LoadLibrary(token[type]);

    if (_errcode != 0) {
      reject("加载控件失败,错误码:" + token.SOF_GetLastError());
    }

    const deviceName = token.SOF_EnumDevice();

    if (deviceName) {
      resolve(deviceName[0]);
    }

    console.log('获取设备', deviceName);
    reject('未找到设备');
  });
}

function getUserList(deviceName) {
  return new Promise((resolve, reject) => {
    const _errcode = token.SOF_GetDeviceInstance(deviceName, "");

    if (_errcode != 0) {
      reject("实例化失败,错误码:" + token.SOF_GetLastError());
    }

    const cerList = token.SOF_GetUserList();

    if (Array.isArray(cerList) && cerList[0] && cerList[0][1]) {
      console.log('获取证书容器', cerList[0][1]);
      resolve(cerList[0][1]);
    } else if (cerList == null) {
      reject("设备中无证书");
    } else {
      reject("获取证书列表失败,错误码:" + token.SOF_GetLastError());
    }
  });
}

/**
 * 获取数字证书
 * @param {Srting}} containerName 容器名称
 * @param {Srting} cerType 0=加密证书 1=签名证书
 */
function exportUserCert(containerName, cerType = 1) {
  return new Promise((resolve, reject) => {
    const cert = token.SOF_ExportUserCert(containerName, cerType);
    if (cert != null && cert != "") {
      console.log('获取到证书', cert);
      resolve(cert);
    } else {
      reject(token.SOF_GetLastError());
    }
  });
}

//获取证书信息
function getCertInfo(signCert) {
  return new Promise((reslove, reject) => {
    const certInfo = {
      Issuer: token.SOF_GetCertInfo(signCert, token.SGD_CERT_ISSUER_CN),
      Subject: token.SOF_GetCertInfo("", token.SGD_CERT_SUBJECT),
      Subject_CN: token.SOF_GetCertInfo("", token.SGD_CERT_SUBJECT_CN),
      Subject_EMail: token.SOF_GetCertInfo("", token.SGD_CERT_SUBJECT_EMALL),
      Serial: token.SOF_GetCertInfo("", token.SGD_CERT_SERIAL),
      CRLRLDistributionPoints: token.SOF_GetCertInfo("", token.SGD_CERT_CRL),
      NotBefore: token.SOF_GetCertInfo("", token.SGD_CERT_NOT_BEFORE),
      ValidTimeTo: token.SOF_GetCertInfo("", token.SGD_CERT_VALID_TIME)
    };
    
    console.log(certInfo);
    reslove(certInfo);
  });

}

export {
  enumDevice,
  getUserList,
  exportUserCert,
  getCertInfo
};