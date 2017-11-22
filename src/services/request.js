import $ from 'jquery';

export const request = (step, data, method) => {
    
    const url = `https://my.agentify.me/api/V0/${step}`        
    
    const query = method === "GET" ? {        
          "url": url,
          "method": method
        } : {        
            "url": url,
            "method": method,
            "data": data
          }
        
    return $.ajax(query).done(data => {              
        return data        
    });
}
