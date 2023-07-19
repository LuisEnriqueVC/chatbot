const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')
require('dotenv').config({path:'./.env'})
/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['ðŸ“„ seguir la conversacion'])
const flowFuncional = addKeyword('no funciona')
.addAnswer('la informacion proporcionada es correcta?',{
    buttons:[
        {
            body:'incorrecta'
        },
        {
            body:'correcta, continuamos'
        },
        {
            body:'habla con un humano'
        }
    ]
})

const flowDocs = addKeyword(['doc', 'documentacion', 'documentaciÃ³n']).addAnswer(
    [
        'ðŸ“„ AquÃ­ encontras las documentaciÃ³n recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)


const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        'ðŸ™Œ AquÃ­ encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'ðŸš€ Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['ðŸ¤ª Ãšnete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowconversacion = addKeyword(['horarios','tiempos','disponibilidad'])
    .addAnswer(['ðŸ¤ª Ãšnete de lunes a viernes', '\n*2* Para siguiente paso.'])
    .addAnswer('Te estoy enviando una imagen',{
        media:'https://i.imgur.com/0HpzsEm.png'
        }) 


/**
 * 
 */
/*
const menuAPI = async ()=>{
    const config = {
        method: 'get',
        url: 'https://api-74xis.strapidemo.com/api/menus',
        headers:{
            'Authorization': 'Bearer ${process.env.STRAPI_API}'
        }
    };
    const {data} = await axios(config).then((i)=>i.data)
    
    return data.map(=>({body:['*${m.attributes.name}:* ${m.attributes.description}','*Precio:*${m.attributes.price} USD'].join('\n')}))
}
*/

const flujoImagen = addKeyword('imagen').addAnswer('Te estoy enviando una imagen',{
media:'https://i.imgur.com/0HpzsEm.png'
})

const flujodeBotons = addKeyword('botones').addAnswer('estos son los botones',{
    buttons:[
        {
            body:'imagen'
        },
        {
            body:'video'
        },
        {
            body:'algo'
        }
    ]
})
/*
const flowSucursales = addKeyword('2')
.addAnswer(
        [
            '👉 *1* una,',
            '👉 *2* mas de dos,',
            ],
            null,
            null,
            [flowTermin1,flowTermin2]

)*/
const flowEquipo = addKeyword('Si')
.addAnswer('¿Ya cuenta con equipo?')
const flowSinEquipo = addKeyword('No')
.addAnswer(
    [
        '👉 *caracteristicas,',
        '👉 *caracteristicas......',
        ]
)
.addAnswer('caracterisy¿ticas de pc',{
    media:'https://i.imgur.com/0HpzsEm.png'
    })
.addAnswer(
    [
        '👉 *caracteristicas,',
        '👉 *caracteristicas......',
        ]

)    
const flowCovertura = addKeyword(['A','2','1'])
.addAnswer(['¿Ya conoce la cobertura que le ofrece el sistema? [Si| NO]'],
null,
null,
[flowEquipo,flowSinEquipo]
)

const flowTermin2 = addKeyword('B')
.addAnswer('Puede ser PyME o Premium, ¿en cuantas sucursales va a repartir esa cantidad de terminales?')
.addAnswer(
[
    '👉 *1* Si es una, la cobertura que le sirve es PyME',
    '👉 *2* Si son mas de dos, la cobertura que le surve es Premium',
    ],
    null,
    null,
    [flowCovertura]
)
const flowTerminales = addKeyword(['B1','B2','B3','B4','B5','B6','B7','B8','Iximati','Yachay'])
.addAnswer('¿Cuentas terminales administrativas/puntos de venta requiere implementar en su negocio?')
.addAnswer('Escoje la opcion que te defina',{
    buttons:[
        {
            body:'A (una)'
        },
        {
            body:'B (+1)'
        },
        {
            body:'algo'
        }
    ]
},
[flowTermin2])


const flowA = addKeyword('AA')
.addAnswer('Continua humano A')

const flowB = addKeyword('BB')
.addAnswer('Continua humano B')

/*
const flowList = addKeyword('List')
.addAnswer('Se ofrecen varios sistemas enfocados a distintos giros, cual es el mas adecuado para su negocio')
.addAnswer(
    [
        'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *B1* Iximati: Papelerías y Cibercafés,',
            '👉 *B2* Yachay: Tlapalerías y ferreterías,',
            '👉 *B3* Katso: abarrotes y cremerías,',
            '👉 *B4* Patli: Farmacias y consultorios médicos,',
            '👉 *B5* Tlachko: control de Billares ,',
            '👉 *B6* Tlachkali: Tortillerías,',
            '👉 *B7* Pädi, negocios en general,',
            '👉 *B8* Tlasomani: Nomina y pago a destajo en fábricas de ropa',

],
null,
null,
[flowTerminales]
)*/
//const flowH = addKeyword('d') 


    const flowC = addKeyword(['C','asesorias'])
    .addAnswer(
    'Selecciona una de las opciones de la lista',
    {
        capture:false
    },
    async (ctx,{provider})=>{
        const list ={
            "header":{
                "type":"text",
                "text":"Sistemas_y_Puntos_de_Venta"
            },
            "body":{
                "text":"Escoje_el_sistema_que_buscas"
            },
            "footer":{
                "text":"escoje_uno_o_regresa"
            },
            "action":{
                "button":"Sistemas",
                "sections":[
                    {
                    "title":"Sistemas_y_puntos_de_venta",
                    "rows":[
                        {
                            "id":"Iximati",
                            "title":"Iximati",
                            "description":"Papelerías_y_cibercafés"
                        },
                        {
                            "id":"B2",
                            "title":"Yachay",
                            "description":"Tlapalerías_y_ferreterías"
                        },
                        {
                            "id":"B3",
                            "title":"Katso",
                            "description":"Abarrotes_y_cremeria"
                        },
                        {
                            "id":"B4",
                            "title":"Patli",
                            "description":"Farmacias/Consultorios"
                        },
                        {
                            "id":"B5",
                            "title":"Tlachko",
                            "description":"Control_de_billares"
                        },
                        {
                            "id":"B6",
                            "title":"Tlachkali",
                            "description":"Tortillerias"
                        },
                        {
                            "id":"B7",
                            "title":"Padi",
                            "description":"Negocios_general"
                        },
                        {
                            "id":"B8",
                            "title":"Tlasomani",
                            "description":"Nomina_pago"
                        }
                    ]
                },
                {
                    "title":"Otro_Negocio",
                    "rows":[
                        {
                            "id":"personal",
                            "title":"Busco_otro",
                            "description":"Contactanos"
                        }
                    ]
                }
            ]
               
            }
        }
    await provider.sendLists(ctx.from, list)  
    }
    )


const flowCall = addKeyword(['d','personal'])
.addAnswer('espera un momento',null,async(ctx)=>{
   
    x=1
    const contexto = ctx.body
    const numero = ctx.from
    //const nombre = ctx.pushName
    let today = new Date
    let nowtime = today.toLocaleTimeString('es-Es').slice(0,5)
        console.log(nowtime,ctx.body,ctx.from,ctx.pushName)
        mensaje(x,numero,contexto,nowtime)
}
)
function mensaje(x,numero,contexto,nowtime){
    const { default: axios } = require("axios");

let url = 'https://graph.facebook.com/v17.0/101193863049643/messages'
let data = {
  messaging_product : "whatsapp",
  recipient_type: "individual",
  to: "525560786804",
  type: "text",
  text: {
    preview_url: false,
    body: "Solicitaron hablar contigo, su numero es: "+numero+" a las: "+nowtime+" por motivos: "+contexto+"."
    }
}
let config ={
  headers:{
    Authorization:"Bearer "+ process.env.jwtToken
  }
}
axios.post(url,data,config)
    }

    const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Buen día, en que le puedo ayudar?*')
    .addAnswer(
        'Selecciona una de las opciones de la lista',
        {
            capture:false
        },
        async (ctx,{provider})=>{
            const list ={
                "header":{
                    "type":"text",
                    "text":"Amoxcalli_consultores"
                },
                "body":{
                    "text":"Soluciones_Informaticas"
                },
                "footer":{
                    "text":"Menu_Principal"
                },
                "action":{
                    "button":"Opciones",
                    "sections":[
                        {
                        "title":"En_que_te_podemos_ayudar",
                        "rows":[
                            {
                                "id":"AA",
                                "title":"Consultoria_Informatica",
                                "description":"A"
                            },
                            {
                                "id":"BB",
                                "title":"Sistemas_admin/Ventas",
                                "description":"B"
                            },
                            {
                                "id":"C",
                                "title":"Asesorias",
                                "description":"C"
                            },
                            {
                                "id":"D",
                                "title":"Contactar_a_personal",
                                "description":"D"
                            }
                        ]
                    }
                ]
                   
                }
            }
        await provider.sendLists(ctx.from, list)  
        }
        )
    


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowA,flowB,flowC,flowCall,flujodeBotons,flowEquipo,flujoImagen,flowSinEquipo,flowTerminales,flowTermin2])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.jwtToken,
        numberId: process.env.numberId,
        verifyToken: process.env.verifyToken,
        version: 'v17.0',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
