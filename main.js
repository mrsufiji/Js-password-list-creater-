const textaria = document.getElementById('wordaria');
const previewBtn = document.getElementById('prw_btn');
const downloadBtn = document.getElementById('down_btn');


let pass = '';
let arr = [];

let regExp1 = /\s+/g; // to make an array form textaria value

let regExp2 = /(?<digit>\d)(?:\d*?)\k<digit>/; // it helps to find any repeteting digits


function passwCombination(q, value) {
  let initial_num = 0;
  let max_limit = max_Combination(q);

  let wordlist = value.split(regExp1);
  // let arr = [];
  let map = new Map();
  for (let i = 0; i < wordlist.length; i++) {
    map.set(`${i}`, wordlist[i])
  }

  let regExp3 = new RegExp(`[${wordlist.length}-9]`, '');
  do {
    initial_num = `${initial_num}`.padStart(q, '0');
    if (!initial_num.match(regExp2) && !(regExp3.test(`${initial_num}`))) {
      let ar = initial_num.split('');
      for (let g = 0; g < ar.length; g++) {
        pass += map.get(ar[g])
      }
      if (pass.length > 8 && pass.length <= 16) {
        arr.push(pass + '\n')
      }
      pass = ''
      //document.write(`${n}<br>`)
    }
  } while (initial_num++ < max_limit)
}

function max_Combination(n) {
  return 10 ** n - 1
}



previewBtn.addEventListener('click', () => {
  let value = textaria.value;
  for (let i = 1; i <= value.split(regExp1).length; i++) {
    passwCombination(i, value)
  }
  alert(arr)
  let blob = new Blob(arr, { type: 'text/plain' })
  let url = URL.createObjectURL(blob);
  previewBtn.href = url

  setTimeout(() => {
    URL.revokeObjectURL(previewBtn.href)
  }, 0)

  //arr = [];
})


downloadBtn.addEventListener('click', () => {
  let value = textaria.value;
  if (textaria.value) return alert('enter words')
  for (let i = 1; i <= value.split(regExp1).length; i++) {
    passwCombination(i, value)
  }
  alert(arr)
  let blob = new Blob(arr, { type: 'text/plain' })
  let url = URL.createObjectURL(blob);
  downloadBtn.download = 'passwords.txt'
  downloadBtn.href = url

  setTimeout(() => {
    URL.revokeObjectURL(downloadBtn.href)
  }, 0)

  //arr = [];
})