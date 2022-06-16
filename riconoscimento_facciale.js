let expr
let nose = []
let jawOutline = []
let mouth = []
let leftEye = []
let rightEye = []
let leftEyeBbrow = []
let rightEyeBrow = []
let HAPPY
let SAD
let ANGRY
let NEUTRAL
let SUPRISED

// let webcamSize = {
//     x:0,
//     y:0
// }

async function init() {

    // -- carica i modelli -----------------------------------------
    const MODELS_URI = './lib/face-api/weights'
    await loadModels(MODELS_URI)
    console.log('Tutti i modelli sono stati caricati.')

    // -- inizializza la webcam ------------------------------------
    const webcam = document.querySelector('video');
    startVideoStream(webcam)

    // -- avvia l’app ----------------------------------------------
    webcam.addEventListener('play', function () {
        console.log('Webcam inizializzata e avviata.')
        webcam.width = webcam.videoWidth / 2
        webcam.height = webcam.videoHeight / 2
        // webcamSize.x = webcam.width
        // webcamSize.y = webcam.height
        run()
    })


    // -------------------------------------------------------------
    // ageGenderNet
    // faceExpressionNet
    // faceLandmark68Net
    // faceLandmark68TinyNet
    // faceRecognitionNet
    // ssdMobilenetv1
    // tinyFaceDetector
    // tinyYolov2

    async function loadModels(uri) {

        // console.log('Carico tinyFaceDetector...')
        // await faceapi.nets.tinyFaceDetector.loadFromUri(uri)

        console.log('Carico ssdMobilenetv1...')
        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri)

        console.log('Carico faceExpressionNet...')
        await faceapi.nets.faceExpressionNet.loadFromUri(uri)

        console.log('Carico faceLandmark68Net...')
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri)

        console.log('Carico ageGenderNet...')
        await faceapi.nets.ageGenderNet.loadFromUri(uri)
    }

    // -------------------------------------------------------------

    function startVideoStream(el) {
        if (navigator.mediaDevices.getUserMedia) {
            return navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                el.srcObject = stream
            }).catch(function (error) {
                console.warn('C’è stato un problema con la webcam!')
                console.log(error)
            })
        }
    }

    // -------------------------------------------------------------

    function getMaxValue(obj) {
        let max = 0
        let key = ''
        for (const k in obj) {
            if (obj[k] > max) {
                max = obj[k]
                key = k
            }
        }
        return {
            key: key,
            value: max
        }
    }

    function run() {
        const canvas = document.querySelector('canvas')
        //  const ctx = canvas.getContext('2d')
        //const pre = document.querySelector('pre')

        const displaySize = { width: webcam.width, height: webcam.height }

        canvas.width = webcam.width
        canvas.height = webcam.height

        setInterval(async function () {

            // -- all faces (più lento!) ---------------------------
            //  const detections = await faceapi.detectAllFaces(webcam)
            // const detections = await faceapi.detectAllFaces(webcam).withFaceExpressions()
            // const detections = await faceapi.detectAllFaces(webcam).withFaceLandmarks()
            // const detections = await faceapi.detectAllFaces(webcam).withFaceLandmarks().withFaceExpressions()
            // const detections = await faceapi.detectAllFaces(webcam).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
            //  const detections = await faceapi.(webcam).withFaceLandmarks().withAgeAndGender().withFaceDescriptors()
            // const detections = await faceapi.detectAllFaces(webcam).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptors()

            // -- single face --------------------------------------
            // const detections = await faceapi.detectSingleFace(webcam)
            // const detections = await faceapi.detectSingleFace(webcam).withFaceExpressions()
            // const detections = await faceapi.detectSingleFace(webcam).withFaceLandmarks()
            const detections = await faceapi.detectSingleFace(webcam).withFaceLandmarks().withFaceExpressions()
            // const detections = await faceapi.detectSingleFace(webcam).withFaceLandmarks().withFaceExpressions().withFaceDescriptor()
            // const detections = await faceapi.detectSingleFace(webcam).withFaceLandmarks().withAgeAndGender().withFaceDescriptor()
            // const detections = await faceapi.detectSingleFace(webcam).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor()

            // const detections = await faceapi.detectSingleFace(webcam)


            if (detections) {
                //const data = faceapi.resizeResults(detections, displaySize) 
                const data = faceapi.resizeResults(detections, { width: 1, height: 1 })

                // -- cancelliamo il canvas ------------------------
                // ctx.fillStyle = 'rgb(220,220,220)'
                // ctx.fillRect(0, 0, canvas.width, canvas.height)

                // -- funzioni interne per il disegno / debug -------
                faceapi.draw.drawDetections(canvas, data, { withScore: false })
                faceapi.draw.drawFaceLandmarks(canvas, data)
                faceapi.draw.drawFaceExpressions(canvas, data)

                // -- tutto il dataset -----------------------------
                // pre.innerHTML = JSON.stringify(data, null, 4)




                // -- INIZIALIZZA L'ESPRESSIONE DEL VOLTO ----------------------------------
                //  pre.innerHTML = JSON.stringify(expr, null, 4)
                //https://stackoverflow.com/questions/35948669/how-to-check-if-a-value-exists-in-an-object-using-javascript#comment86065231_35948669

                expr = getMaxValue(data.expressions)
                HAPPY = Object.values(expr).includes("happy")
                SAD = Object.values(expr).includes("sad")
                ANGRY = Object.values(expr).includes("angry")
                NEUTRAL = Object.values(expr).includes("neutral")
                SUPRISED = Object.values(expr).includes("suprised")
                //--------------------- HAPPY ---------------------------//

                if (HAPPY) {
                    slider_Red.value = 255
                    slider_Green.value = 255
                    slider_Blue.value = 0
                    slider_Raggio.value = RaggioAuto // MAX 20 
                    //Behaviours
                    slider_G.value = 400 //  MAX 800
                    slider_Quant.value = 20 //  MAX 20
                    slider_Life.value = 250 //  MAX 500
                    slider_Magnitude.value = 10   //  MAX 10

                    // console.log("felice" + "=" + felice)

                }
                //--------------------- NEUTRAL ---------------------------//
                //crea funzione di automazione con setinterval per raggio value, con sin | https://javascript.info/settimeout-setinterval
                else if (NEUTRAL) {
                    //Colori e Dimensioni
                    slider_Red.value = 100
                    slider_Green.value = 255
                    slider_Blue.value = 255
                    slider_Raggio.value = 3 // MAX 20
                    //Behaviours
                    slider_G.value = 60 //  MAX 800
                    slider_Quant.value = 10 //  MAX 20
                    slider_Life.value = 500 //  MAX 500
                    slider_Magnitude.value = 2   //  MAX 10


                }
                //--------------------- SAD ---------------------------//
                // else if (SAD) {
                    //     slider_Red.value = 160
                //     slider_Green.value = 160
                //     slider_Blue.value = 255
                //     slider_Raggio.value = RaggioAuto // MAX 20
                //     //Behaviours
                //     slider_G.value = 50 //  MAX 800
                //     slider_Quant.value = 10 //  MAX 20
                //     slider_Life.value = 200 //  MAX 500
                //     slider_Magnitude.value = 2   //  MAX 10

                // }
                //--------------------- ANGRY ---------------------------//
                else if (ANGRY) {
                    slider_Red.value = 255
                    slider_Green.value = 0
                    slider_Blue.value = 0
                    slider_Raggio.value = RaggioAuto // MAX 20
                    //Behaviours
                    slider_G.value = -200 //  MAX 800
                    slider_Quant.value = 10 //  MAX 20
                    slider_Life.value = 200 //  MAX 500
                    slider_Magnitude.value = 4   //  MAX 10

                }


                //--------------------- SURPRISED ---------------------------//
                else if (SUPRISED) {
                    slider_Red.value = 255
                    slider_Green.value = 0
                    slider_Blue.value = 255
                    slider_Raggio.value = RaggioAuto // MAX 20
                    //Behaviours
                    slider_G.value = -200 //  MAX 800
                    slider_Quant.value = 10 //  MAX 20
                    slider_Life.value = 200 //  MAX 500
                    slider_Magnitude.value = 4   //  MAX 10
                }

                // -- età e sesso ----------------------------------
                // pre.innerHTML = data.gender + '\n' + Math.round(data.age)

                // -- parti del volto ------------------------------
                jawOutline = data.landmarks.getJawOutline()
                nose = data.landmarks.getNose()
                mouth = data.landmarks.getMouth()
                leftEye = data.landmarks.getLeftEye()
                rightEye = data.landmarks.getRightEye()
                leftEyeBbrow = data.landmarks.getLeftEyeBrow()
                rightEyeBrow = data.landmarks.getRightEyeBrow()



                // pre.innerHTML = JSON.stringify(nose, null, 4)
                // pre.innerHTML = JSON.stringify(leftEye, null, 4)

            }
            if (!detections) {
                console.log("c'è nessunoooooo")
                slider_Red.value = 255
                slider_Green.value = 255
                slider_Blue.value = 255
                slider_Raggio.value = RaggioAuto // MAX 20
                //Behaviours
                slider_G.value = RaggioAuto //  MAX 800
                slider_Quant.value = 3 //  MAX 20
                slider_Life.value = 500 //  MAX 500
                slider_Magnitude.value = 10   //  MAX 10
            }

        }, 200)
    }

}