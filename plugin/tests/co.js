function aaa() {
    const str=`
    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      
      a:hover {
        font-size: 26px;
      }
      
      [testname] {
        margin: 0;
        display: flex;
        place-items: center;
        min-width: 320px;
        min-height: 100vh;
      }
      
      h1 {
        font-size: 3.2em;
        line-height: 1.1;
      }
      
      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      
      button:hover {
        border-color: #646cff;
      }
      
    `
    let excludeStr=''
    const scopeName='testname'
    const regex3 = new RegExp(`\\[testname\\]\\s*{[^{}]*}`, 'gs')
    const code = str.replace(regex3, match => {
            excludeStr += match
            return ''
        })
}

let a=aaa()