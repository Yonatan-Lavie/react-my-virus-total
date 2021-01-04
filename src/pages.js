import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FileImage from "./images/thumbprint.png";
import WorldImage from "./images/website-scan.svg";
import ShearchHashImage from "./images/VT_search_hash.svg";
import axios, { post } from 'axios';



//yshavat89 API key -  


export function Test() { 

    const [selectedFile, setSelectedFile] = useState(null);
	
	// On file select (from the pop up) 
	const onFileChange = function(event){ 
	
	// Update the state 
	setSelectedFile( event.target.files[0]); 
	
	}; 
	
	// On file upload (click the upload button) 
	const onFileUpload = () => { 
        if(!selectedFile) return;
        // Create an object of formData 
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( 
            "file", 
            selectedFile, 
            selectedFile.name 
        ); 
        formData.append( 
            "filename",  
            selectedFile.name 
        ); 
        // Details of the uploaded file 
        console.log(selectedFile); 
        
        // Request made to the backend api 
        // Send formData object 
        axios.post("https://www.virustotal.com/api/v3/files", formData,{ headers: {
            'x-apikey': '9ac8ed79b86e06e978236ad0f1645263102f3c874e738bcac381846612da2f88',
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
        }})
        .then(response => console.log(response.data));
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	const fileData = () => { 
	
	if (selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {selectedFile.name}</p> 
			<p>File Type: {selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	};  
	
	return ( 
		<div> 
			<h1>[File]</h1>
            <img alt="file with footprint" src={ FileImage } height={50} /> 
			<div> 
				<div>
                    <input type="file" onChange={onFileChange} />
                </div>
                
				<div>
                    <button onClick={onFileUpload}> 
                    Upload! 
                    </button> 
                </div>
			</div> 
		{fileData()} 
		</div> 
	); 
} 





// export function Test(){

//     return (
//         <div>
//             <h1>[Test]</h1>
//         </div>
//     );

// }

export function File(){
    const [fileIn, setFileIn] = useState(null);
    const [vtData, setVtData] = useState(null);
    

    const uploadToVT = function(fileIn){

        if(fileIn === null )
        {
            console.log("null");
            return;
        }
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( 
            "file", 
            fileIn, 
            fileIn.name 
        ); 
        formData.append( 
            "filename",  
            fileIn.name 
        ); 
        console.log(formData);


        fetch(`https://www.virustotal.com/api/v3/files`, {
            method: 'POST',
            body: formData,
            headers: {
                'x-apikey': '9ac8ed79b86e06e978236ad0f1645263102f3c874e738bcac381846612da2f88',
                'Accept': 'application/json',
                'Content-Type': `application/x-www-form-urlencoded`,
            },
            
        })
        .then(response => response.json())
        .then(response => setVtData(response.data))
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>[File]</h1>
            <img alt="file with footprint" src={ FileImage } height={50} />
            <input
                type="file"
                onChange={(e) => {setFileIn(e.target.files[0])}}
            />
            <button onClick={() => uploadToVT(fileIn)}>Upload</button>
        </div>
    );
}

export function Url(){
    const [strIn, setStrIn] = useState("");
    const [vtData, setVtData] = useState(null);
    const checkUrlInVT = function(urlToScan){
        if(urlToScan === "" ) return;
        urlToScan = btoa(urlToScan);
        urlToScan.indexOf('=')
        urlToScan = urlToScan.substring(0,urlToScan.indexOf('=') === -1 ? urlToScan.length :  urlToScan.indexOf('='));
        fetch(`https://www.virustotal.com/api/v3/urls/${urlToScan}`, {
            method: 'GET',
            headers: {
                'x-apikey': '9ac8ed79b86e06e978236ad0f1645263102f3c874e738bcac381846612da2f88',
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json())
        .then(response => setVtData(response.data))
        .catch(error => console.error(error));
    };

    const handleInputChange = (event) => setStrIn(event.target.value);

    return (
        <div>
            <h1>[Url]</h1>
            <img alt="World" src={ WorldImage } height={50} />
            <input type="url" placeholder="Search or scan a URL" value={strIn} onChange={handleInputChange} />
            <button onClick={() => checkUrlInVT(strIn)}>Search</button>
            <div>
                <table style={{width:"100%"}}>

                        {vtData ?  Object.keys(vtData.attributes.last_analysis_results).map( (key, i) => (<tr><td>{key}</td></tr>)): null}
                </table>
            </div>
        </div>
    );
}

export function Search(){
    /*

    */
    const [strIn, setStrIn] = useState("");
    const [vtData, setVtData] = useState(null);
    const searchlInVT = function(searchTerm){
        
        let ipRegex = /^((((2[0-5][0-5])|(1?[0-9]?[0-9]))\.){3}((2[0-5][0-5])|(1?[0-9]?[0-9])){1})$/;
        let urlRegex = /^(((http)|(https))\:\/\/)?(www\.)?((\w|\d)+\.)+((\w|\d)+)(\/(\w|\d)+)*((\/(((\w|\d)+)=((\w|\d)+))?)((#(\w|\d)+)?))?$/;
        let hashRegex = /^((([0-9]|([a-f]|[A-F])){32})|(([0-9]|([a-f]|[A-F])){40})|(([0-9]|([a-f]|[A-F])){64}))$/;
        let searchCategory = "";
        if(searchTerm === "" ) return;
        if(ipRegex.test(searchTerm) ){
            //if the input string is  IP
            searchCategory = "ip_addresses/";
        }
        else if(urlRegex.test(searchTerm)){
            //if the input string is  URL
            searchCategory = 'urls/';
            searchTerm = btoa(searchTerm);
            searchTerm.indexOf('=')
            searchTerm = searchTerm.substring(0,searchTerm.indexOf('=') === -1 ? searchTerm.length :  searchTerm.indexOf('='));
        }
        else if(hashRegex.test(searchTerm)){
            //if the input string is  HASH
            searchCategory = "";
            searchTerm = `search?query=${searchTerm}`;
        }

        fetch(`https://www.virustotal.com/api/v3/${searchCategory}${searchTerm}`, {
            method: 'GET',
            headers: {
                'x-apikey': '9ac8ed79b86e06e978236ad0f1645263102f3c874e738bcac381846612da2f88',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            setVtData(response.data);
            console.log(response);
        })
        .catch(error => console.error(error));
    };

    const handleInputChange = (event) => setStrIn(event.target.value);
    return (
        <div>
            <h1>[Search]</h1>
            <img alt="Shearch Hash" src={ ShearchHashImage } height={50} />
            <input type="text" placeholder="URL, IP address, domain, or file hash" value={strIn} onChange={handleInputChange} />
            <button onClick={() => searchlInVT(strIn)}>Search</button>
        </div>
    );
}


export function Whoops404(){
    let location = useLocation();
    return (
        <div>
            <h1>Resource not found at {location.pathname}!</h1>
        </div>
    );
}