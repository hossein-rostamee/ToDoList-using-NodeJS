const { createServer } = require ( 'http' );


const items = []

function add ( req, res, item ) {
    items.push ( item )
    res.end ( item );
}

function list ( req, res ) {
    items.forEach ( item => {
        res.write ( `<p>${ item }</p>` )
    } )
    res.end ()
}

const actions = {
    add, list
}

createServer ( ( req, res ) => {
    const urlParts = req.url.split ( '/' ).slice ( 1 )
    const [ actionName, params ] = urlParts
    const action = actions [ actionName ]
    if ( ! action || typeof action !== 'function' ) {
        res.statusCode = 400
        res.end ( "Invalid action name." )
        return
    }
    action ( req, res, params )
} ).listen ( 4000, () => {
    console.log ( 'Server is listening on port 4000.' )
} )
