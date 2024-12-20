import React, {useState, useRef, useEffect} from 'react'

const useSpeechToText = (options) => {
    const [listening, setListening] = useState(false)
    const [input, setInput] = useState("")
    const recognitionRef = useRef(null)

    useEffect(()=>{
        if(!('webkitSpeechRecognition' in window)) {
            console.error("Unable to access webspeech API")
            return;
        }
        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current
        recognition.interimResults = true
        recognition.lang = options.lang || "en-US"
        recognition.continuous = true

        recognition.onresult = (event) => {
            let text = ""
            for(let i=0; i < event.results.length; i++){
                text += event.results[i][0].transcript
            }
            setInput(text)
        }

        recognition.onerror = (event) => {
            console.error("Error in speech recognition:", event.error)
        }


        recognition.onend = () => {
            setListening(false)
            setInput("")
        }

        return () => {
            recognition.stop()
        }
    }, [])

    const startInput = () => {
        if(recognitionRef.current && !listening){
            recognitionRef.current.start()
            setListening(true)
        }
    }

    const stopInput = () => {
        if(recognitionRef.current && listening){
            recognitionRef.current.stop()
            setListening(false)
        }
    }

    return {
        listening, input, startInput, stopInput
    }
}

export default useSpeechToText