const htmlDecode = decodeHtml => {
    let temp = document.createElement('div');
    temp.innerHTML = decodeHtml;
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
};
export default htmlDecode;
