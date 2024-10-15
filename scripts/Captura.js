var CAPTURAR_NUEVA_IMAGEN=false;
$boton_pause = document.querySelector("#boton-pause");
$boton_play = document.querySelector("#boton-play");
$boton_cancelar_play=document.querySelector('#boton-cancelar-play');
$boton_cancelar_pause=document.querySelector('#boton-cancelar-pause');
$boton_guardar=document.querySelector('#boton-guardar');
$select=document.querySelector('#seleccionarDispositivo');
$canvas=document.querySelector('#canvas')
var video=document.querySelector('#video');



const limpiarSelect = () => {
    for (let x = $select.options.length - 1; x >= 0; x--)
    $select.remove(x);
};
const obtenerDispositivos = () => navigator
    .mediaDevices
    .enumerateDevices();
// console.log(navigator.mediaDevices.enumerateDevices);
const llenarSelectConDispositivosDisponibles = () => {

    limpiarSelect();
    obtenerDispositivos()
        .then(dispositivos => {
            const dispositivosDeVideo = [];
            dispositivos.forEach(dispositivo => {
                const tipo = dispositivo.kind;
                if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
            });
            // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
            if (dispositivosDeVideo.length > 0) {
                // Llenar el select
                dispositivosDeVideo.forEach(dispositivo => {
                    const option = document.createElement('option');
                    dispositivo.deviceId==''? option.value='sin id':option.value=dispositivo.deviceId;
                    dispositivo.label==''?option.text='sin etiqueta':option.text = dispositivo.label;
                    $select.appendChild(option);
                });
            }
        });
}

$boton_cancelar_pause.addEventListener("click", function() {
                   video.play();
                    CAPTURAR_NUEVA_IMAGEN=false;
                    console.log(CAPTURAR_NUEVA_IMAGEN);
                 
            });



$boton_pause.addEventListener("click", function() {
                CAPTURAR_NUEVA_IMAGEN=true;
                console.log(CAPTURAR_NUEVA_IMAGEN);
                video.pause();

            });



$boton_play.addEventListener("click", function() {
    if(!(navigator.getUserMedia||
                    navigator.webkitGetUSerMedia||
                    navigator.mozGetUSerMEdia)){
                        alert("Lo siento. Tu navegador no soporta esta característica");
                        $estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
                        return;
    }
    navigator.getMedia=(navigator.getUserMedia||
                    navigator.webkitGetUSerMedia||
                    navigator.mozGetUSerMEdia);

    let stream;//Guarda el stream Global
    // Comenzamos pidiendo los dispositivos
    obtenerDispositivos().then(dispositivos => {
        // Vamos a filtrarlos y guardar aquí los de vídeo
        const dispositivosDeVideo = [];

        // Recorrer y filtrar
        dispositivos.forEach(function(dispositivo) {
            const tipo = dispositivo.kind;
            if (tipo === "videoinput") {
                    dispositivosDeVideo.push(dispositivo);
                }
                

        });
        alert(dispositivosDeVideo.length);
        console.log(dispositivosDeVideo.length);
        // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
        // y le pasamos el id de dispositivo
        if (dispositivosDeVideo.length > 0) {
        // Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
            mostrarStream(dispositivosDeVideo[1].deviceId);
        }
    });
    const mostrarStream=idDispositivo=>{
        //restricciones (contraints) *requerido
        navigator.getMedia({ video:{
                                deviceId:idDispositivo,
                            // width: { ideal: 425 }, 
                                height: { ideal: 1080 } 
                                }
                            },//funcion de finalizacion (susses-callback) *Requerido
                            function(localMediaStream){
                                console.log(localMediaStream);
                                video.srcObject=localMediaStream;
                                // Escuchar cuando seleccionen otra opción y entonces llamar a esta función
                                $select.onchange = () => {
                                    // Detener el stream
                                    if (stream) {
                                        stream.getTracks().forEach(function(track) {
                                            track.stop();
                                        });
                                    }
                                    // Mostrar el nuevo stream con el dispositivo seleccionado
                                    mostrarStream($select.value);
                                }
                                stream=localMediaStream; 
                                //video.play();
                                //video.setAttribute('height','299px');
                                //video.src=window.URL.createObjectURL(localMediaStream);
                                video.onloadedmetadata=function(e){
                                    $boton_cancelar_play.addEventListener("click",function(){
                                        video.setAttribute('style','height:2px;');
                                        CAPTURAR_NUEVA_IMAGEN=false;
                                        stream.getTracks()[0].stop();
                                        console.log(stream.getTracks()[0].readyState);
                                    });
                                };

                            },
                            function(err){
                                console.log("ocurrior el siguiente error: "+ err);
                            }
                        
    )};
    llenarSelectConDispositivosDisponibles();
    video.setAttribute('style','height:299px;');
    CAPTURAR_NUEVA_IMAGEN=false;
    console.log(CAPTURAR_NUEVA_IMAGEN);
    video.play();
                           


    
});

$boton_guardar.addEventListener("click",function(){
                $idGage=document.querySelector("#idGage1");
                
                if (CAPTURAR_NUEVA_IMAGEN==true) {
                    //if($idGage.value!=''){
                        //Obtener contexto del canvas y dibujar sobre él
                        let contexto = $canvas.getContext("2d");
                        $canvas.width = video.videoWidth;
                        $canvas.height = video.videoHeight;
                        contexto.drawImage(video, 0, 0, $canvas.width, $canvas.height);
                        console.log($canvas);
                        let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
                        //console.log(foto)

                        let spt=foto.split("base64,")[1];
                        var id=document.getElementById("idGage");
                        var archivo=document.getElementById("idGage1");
                        var linkGG=document.getElementById("linkGG");
                        var f=new Date();
                        var dd=(f.getDate()<10?'0':'')+f.getDate();
                        var mm=((f.getMonth()+1)<10?'0':'')+(f.getMonth()+1);
                        var yy=(f.getFullYear().toString().substr(-2));
                        var FechaHoy=dd+mm+yy;
                        var nombre=id.value +" IMG "+FechaHoy+".webp";
                        archivo.value=nombre;
                  
                        let otra=$canvas.toDataURL("image/webp",0.7);
                        let spt2=otra.split("base64,")[1];
                        //console.log(otra);
                  
                  
                  
                        let obj={
                            base64:spt2,
                            type:"image/webp",
                            name:nombre
                        }
                        let url = "https://script.google.com/macros/s/AKfycbwquZ4cI7XMSWVDqt5pBfa48pSLKyDAh3jbzc4NDOpOUqt4Stj2TTRP7l2texGRL0V_/exec";
                        // This line sends a POST request to the URL specified in the "url" variable, with the "obj" object as the request body
                        fetch(url,{
                            method:"POST",
                            body:JSON.stringify(obj)
                        })
                        // This line waits for the response from the server and converts it to text
                        .then(r=>r.text())
                        // This line logs the response data to the console
                        .then(data=>{console.log(data),linkGG.value=data.split("uploaded: ")[1]})
                        
                        
                       // let enlace = document.createElement('a'); // Crear un <a>
                        //enlace.download = $idGage.value +" IMG "+FechaHoy+".png";
                        //enlace.download = $idGage.value;
                        //enlace.href = foto;
                        //enlace.click();
                        CAPTURAR_NUEVA_IMAGEN=false;
                        video.play();
                    //}else{
                    //    alert("ingresa id de Gage");
                    //}
                    
                } else {
                    console.log("nada que capturar");
                }

            });
