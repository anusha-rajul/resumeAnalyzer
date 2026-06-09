import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

const OutputSection = ({ result, reset }) => {
  if(!result) return null; 

  const scoreColor = result.atsScore >= 71 ? 'text-green-700' : result.atsScore >= 41 ? 'text-yellow-700' : 'text-red-700';
  let matchedKeywords = result.matchedKeywords.length;
  let missingKeywords = result.missingKeywords.length;

  const getSectionColor = (score) => {
    if (score >= 71) return 'bg-green-50 text-green-700'
    if (score >= 41) return 'bg-yellow-50 text-yellow-700'
    return 'bg-red-50 text-red-700'  
  }

  return (
    <div className="mx-10">
      {result && (
       
        <div className="max-w-3xl mx-auto mt-2">
         
              <div className="flex flex-col gap-4 ">
           <div className="flex justify-between items-center">
            <h1 className="mb-5 font-bold">Your Score: </h1>
          <button className="bg-zinc-800 text-white px-4 py-2 rounded-md inline-block" onClick={reset}>Analyze Another Resume</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
              <Card className="text-center text-lg bg-gray-50" >
            <CardHeader>
              <CardTitle>ATS Score</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className={`text-4xl ${scoreColor}`}>{result.atsScore} <span className="text-lg text-black">/ 100</span></h1>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Matched Keywords</CardTitle>
            </CardHeader>
            <CardContent className="text-4xl text-green-700">{ matchedKeywords }</CardContent>
            </Card>
            
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Missing Keywords</CardTitle>
              </CardHeader>
              <CardContent className="text-4xl text-red-700">{missingKeywords}</CardContent>
            </Card>

          </div>


       
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
            <Card >
            <CardHeader>
              <CardTitle>Matched Keywords</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              {result.matchedKeywords.map((match, index) => (
              <Badge className="bg-green-50 text-green-700" key={index}>{match}</Badge>
              ))}
            
            </CardContent>
          </Card>

          <Card >
            <CardHeader>
              <CardTitle>Missing Keywords</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
            {result.missingKeywords.map((missingKeyword, index) => (
            <Badge key={index} className="bg-red-50 text-red-700">{missingKeyword}</Badge>
          ))}
            
            </CardContent>
          </Card>
            </div>

          <Card className="max-w-3xl bg-gray-50">
            <CardHeader>
              <CardTitle>Section Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="flex justify-between">Skills <Badge className={getSectionColor(result.sectionScores.skills)}>{result.sectionScores.skills} / 100</Badge></p>
              <hr />
              <p className="flex justify-between">Experience <Badge className={getSectionColor(result.sectionScores.experience)}>{result.sectionScores.experience} / 100</Badge></p>
              <hr />
              <p className="flex justify-between">Education <Badge className={getSectionColor(result.sectionScores.education)}>{result.sectionScores.education} / 100</Badge></p>
            </CardContent>
          </Card>
          

          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">  
          {result.suggestions.map((suggestion, index) => (
            <div key={index} className="flex gap-3 items-center"><span className="bg-green-700 w-2 h-2 rounded-full"></span> <span>{suggestion}</span></div>
          ))}
            </CardContent>
          </Card>


          </div>
          </div>
          )}
    </div>
  )
}

export default OutputSection
