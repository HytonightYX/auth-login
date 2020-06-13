
//枚举证书容器
function EnumContainers() {
	var containerLists = "";
	var i = 0;
	for (i = 0; i < 8; i++) {
		var containerName = token.SOF_EnumCertContiner(i);
		if (containerName.length > 0) {
			containerLists += "Container " + i + ": " + containerName + "\r\n";
		}
	}
	document.getElementById("txt_ContainerLists").value = containerLists;
}

//查找证书容器
function FindContainerName() {
	var certSN = document.getElementById("txt_CertSN").value;
	var containerName = "";
	containerName = token.SOF_FindContainer(certSN);
	document.getElementById("txt_FindContainer").value = containerName;
}

//删除证书
function DeleteCertificate() {
	var certSN = document.getElementById("txt_CertSN").value;
	var retVal = 0;
	retVal = token.SOF_DeleteCert(certSN); //0:OK
	alert(retVal);
}
//删除容器
function DeleteContainerName() {
	var certSN = document.getElementById("txt_CertSN").value;
	var retVal = 0;
	retVal = token.SOF_DeleteContainer(certSN); //0:OK
	alert(retVal);
}

//SM2签名
function SignSM2() {
	var certSN = document.getElementById("txt_CertSN").value;
	var plain = document.getElementById("txt_SignPlain").value;
	var signature = "";
	document.getElementById("txt_Signature").value = "";

	signature = token.SOF_SignByCert(certSN, plain);

	document.getElementById("txt_Signature").value = signature;
}

//SM2验证签名
function VerifySM2() {
	var certSN = document.getElementById("txt_CertSN").value;
	var plain = document.getElementById("txt_SignPlain").value;
	var signature = document.getElementById("txt_Signature").value;
	var retVal = 0;
	retVal = token.SOF_VerifyByCert(certSN, plain, signature); //0:OK
	alert(retVal);
}

//SM2通过证书来验证签名
function VerifyByExtCert() {
	var cert = document.getElementById("txt_ExtCert").value;
	var plain = document.getElementById("txt_SignPlain").value;
	var signature = document.getElementById("txt_Signature").value;
	var retVal = 0;
	retVal = token.SOF_VerifyByExtCert(cert, plain, signature); //0:OK
	alert(retVal);
}

//生成P10请求
function P10_GenRequest() {
	var dn = document.getElementById("txt_P10DN").value;
	var selectID = document.getElementById("P10_mech");
	var index = selectID.selectedIndex;
	if (index < 0) {
		alert("请选中列表中的算法再操作");
		return;
	}
	var asymAlg = selectID.options[index].text;

	var selectID_keyLength = document.getElementById("P10_KeyLength");
	index = selectID_keyLength.selectedIndex;
	if (index < 0) {
		alert("请选中列表中的算法再操作");
		return;
	}
	var asym_key_length = selectID_keyLength.options[index].text;

	var container = document.getElementById("txt_Container_P10orImp").value;
	var keyLength = parseInt(asym_key_length);
	if (asymAlg == "SM2") {
		keyLength = 256;
	}

	var p10Req = "";
	var keySpec = 1; //sign
	p10Req = token.SOF_GenerateP10Request(container, dn, asymAlg, keySpec, keyLength);
	document.getElementById("P10_requestData").value = p10Req;
}

//导入签名证书
function importSignCert() {
	var cert = document.getElementById("txt_SignCertData").value;
	var container = document.getElementById("txt_Container_P10orImp").value;
	if (cert.length < 256) {
		alert("无效的签名证书数据。");
		return;
	}
	var retVal = 0;
	retVal = token.SOF_ImportCert(container, cert, 1); //0:OK
	alert(retVal);
}

//导入加密证书
function importEncryptCert() {
	var container = document.getElementById("txt_Container_P10orImp").value;
	var selectID = document.getElementById("P10_mech");
	var index = selectID.selectedIndex;
	if (index < 0) {
		alert("请选中列表中的算法再操作");
		return;
	}
	var asymAlg = selectID.options[index].text;
	var nAsymAlg = 0x00020100; //SGD_SM2_1
	if (asymAlg == "RSA") {
		nAsymAlg = 0x00010000;//SGD_RSA
	}

	var symAlg = "RC4";
	var EncryptedSessionKeyData = document.getElementById("txt_EncryptedSessionKeyData").value;
	var EncryptedPrivateKeyData = document.getElementById("txt_EncryptedPrivateKeyData").value;
	var cert = document.getElementById("txt_EncryptCertData").value;

	var retVal = 0;
	retVal = token.SOF_ImportCryptoCertAndKey(container, cert, nAsymAlg, EncryptedSessionKeyData, symAlg, EncryptedPrivateKeyData); //0:OK
	alert(retVal);


}

function exportPubKeyEx() {
	var container = document.getElementById("txt_Container_P10orImp").value;
	var exportType = 2; //DER
	var sign = 1;
	var pubkey = token.SOF_ExportPubKeyEx(container, sign, exportType);
	document.getElementById("Exp_PubKey").value = pubkey;
}
