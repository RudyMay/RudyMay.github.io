export function pad(val) {
  let valuestring;
  let valString;
  valString = val + "";

  if(valString.length < 2) {   
    valuestring = "0" + valString;
  } else { 
    valuestring = valString;
  }
  
  return valuestring;
}