import { useState } from "react"
import { analyzeResume } from "../utils/gemini"
import {toast} from 'react-toastify'
import { extractTextFromPDF } from "@/utils/pdfExtractor"


const InputSection = ({ result, setResult }) => {
    const [resume, setResume] = useState('')
    const [jobDesc, setJobDesc] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPdf, setIsPdf] = useState(false)
    const [filename, setFilename] = useState('')
    const [isParsing, setIsParsing] = useState(false)
    
    async function handlePdfUpload(e) {
        let file = e.target.files[0];
        if (!file) return null;
        if (file.type !== 'application/pdf') {
            toast.error("Upload only in .pdf format")
            return 
        }
        try {
            setIsParsing(true)
            setFilename(file.name);
            const text = await extractTextFromPDF(file);
            setResume(text);
            toast.success("File parsed successfully")
       } catch (error) {
         toast.error(error)
        }
        finally {
            setIsParsing(false)
        }

    }

    async function analyze() {
        if (!resume || !jobDesc) {
            toast.error('Enter both the fields')
            return;
            
        }
        try {
            setIsLoading(true)
            let data = await analyzeResume(resume, jobDesc);
            setResult(data)
            setResume('')
            setJobDesc('')
            setFilename('')
        } catch (error) {
            toast.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={result ? 'flex w-full' : 'min-h-screen flex w-full'}>
            <div className={result ? `fixed bottom-4 flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-4xl left-1/2 -translate-x-1/2 bg-zinc-100 px-4 py-2 rounded-2xl` : `m-auto bg-zinc-100 rounded-full  flex flex-col md:flex-row gap-5 w-full max-w-4xl px-4 py-2  items-center`}>
                
                <div className="flex-1 w-full">
                    <div className="flex gap-3">
                        <button className={`px-4 py-2 rounded-md text-sm ${!isPdf ? 'bg-zinc-800 text-white ' : 'bg-white text-zinc-800'}`} onClick={() => { setIsPdf(false); setResume(''); setFilename('')}}>Paste Text</button>
                        <button className={` px-4 py-2 rounded-md text-sm ${isPdf ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-800'}`} onClick={() => { setIsPdf(true); setResume(''); setFilename('')}}>Upload Pdf</button>
                        </div>
                </div>

                {isPdf  
                    ? <label className="rounded-lg flex-1 border border-zinc-400 px-4 py-2 text-sm w-full">
                        <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
                        {isParsing ? 'Extracting file...' : filename ? `${filename}` : 'Click to upload PDF'}
                </label>   
                : <textarea className="rounded-2xl flex-1 border border-zinc-400 px-4 py-2 resize-none text-sm w-full" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume here"></textarea>}
                
                <textarea className=" rounded-2xl flex-1 border border-zinc-400 px-4 py-2 resize-none text-sm w-full" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste job description here"></textarea>
                <button disabled={isLoading} className={`${isLoading && ('opacity-50')} rounded-xl shrink-0 bg-zinc-800 text-white px-4 py-2 w-full md:w-auto`} onClick={analyze}> { isLoading ? 'Analyzing...' : 'Analyze' }</button>
                
            </div>
            </div>
  
  )
}

export default InputSection
