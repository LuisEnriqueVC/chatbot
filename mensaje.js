const { default: axios } = require("axios");

let url = 'https://graph.facebook.com/v17.0/101193863049643/messages'
let data = {
  messaging_product : "whatsapp",
  recipient_type: "individual",
  to: "525582914841",
  type: "text",
  text: {
    preview_url: false,
    body: "Hablar personalmente"
    }
}
let config ={
  headers:{
    Authorization:"Bearer EAALpLPNZCuZA8BAETDiXdBqy5Ua39dR7VwTdoTShGJcjl67Ll1XfIlE3mQ1Xr3S1R5gjOiZCMU58JB3V70HxZAuwzJ0ZAxmyAJOWmxiyMAqJzJ5yhcTUKxlq8RyZCrOfSpEaRf1y7QmeNZB4mliY5VzINwKy5oyCQ7zsmQAfazX5pg2UU2Hjln9xquICHF9oiZB3x0m7t72OxnaTW7B6Hd7H"
  }
}
axios.post(url,data,config)
