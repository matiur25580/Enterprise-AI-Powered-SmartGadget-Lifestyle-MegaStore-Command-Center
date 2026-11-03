export function getAuthToken(){
  try{
    const auth=JSON.parse(localStorage.getItem('ms_auth')||'null');
    return auth?.token||'';
  }catch{
    return '';
  }
}
