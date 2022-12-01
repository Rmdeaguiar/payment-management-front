
function removeVogaisString( name ){
const Initials = name.replace(/[aeiouà-ú]/gi,'');
return Initials[0] + Initials[1]
}

export default removeVogaisString



