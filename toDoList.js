const { createServer } = require ( "http" );

let _id=0;

function makeId()
{
    return _id++;
}

let tasks = [
        { id:makeId() , state:"doing" , name:"Wash shamlooo" }
      , { id:makeId() , state:"doing" , name:"Wash babi" }
      , { id:makeId() , state:"doing" , name:"Wash sanati" }
];

function add ( req , res , params ) 
{
    let newTask = { id:makeId() , state:params[0] , name:params[1] };
    tasks.push( newTask );
    res.end(params[1]);
}

function update (req , res , params)
{
    let flag = false;
    tasks.forEach ( (item)=>{
        if ( item.id == params[0] ){
            item.state = params[2];
            item.name = params [1];
            flag = true;
        } 
    } );
    if ( flag == true ) res.end( "updated successfully" );
    else res.end( "invalid id" );
}

function remove ( req , res , params )
{
    tasks = tasks.filter( (item)=>{
        return item.id != params[0];
    } );
    res.end( "deleted successfully" );
}

function get ( req , res , params ) 
{
    tasks.forEach( (item)=>{
        if(item.id == params[0]){
            res.end(item.name);
        }
    } )
    res.end("invalid id");
}

function list ( req , res , params )
{
    res.write( `<h1>ToDO</h1>` );
    tasks.forEach ( (item)=>{
        if ( item.state === "todo" ) res.write( `<p>${item.name}</p>` );
    } ); 
    res.write( `<h1>Doing</h1>` );
    tasks.forEach ( (item)=>{
        if ( item.state === "doing" ) res.write( `<p>${item.name}</p>` );
    } ); 
    res.write( `<h1>Done</h1>` );  
    tasks.forEach ( (item)=>{
        if ( item.state === "done" ) res.write( `<p>${item.name}</p>` );
    } );  
    res.end();
}

let actions = {
    add , list , update , remove , get 
};

createServer( ( req , res )=>{
    const urlParts = req.url.split ( '/' ).slice ( 1 );
    let [ actionName, ...params ] = urlParts
    const action = actions [ actionName ];
    // console.log(params);
    if ( ! action || typeof action !== 'function' ) {
        res.statusCode = 400
        res.end ( "Invalid action name." )
        return
    }
    action ( req, res, params )
} ).listen( 4000 );




