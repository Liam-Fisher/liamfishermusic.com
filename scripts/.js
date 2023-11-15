const intervalStructures = [
[7, 4, 5],
[7, 4, 4],
[7, 3, 7],
[7, 3, 6],
[7, 3, 5],
[7, 3, 4],
[7, 2, 8],
[7, 2, 7],
[7, 2, 6],
[7, 2, 5],
[7, 1, 9],
[7, 1, 8],
[7, 1, 7],
[6, 4, 6],
[6, 4, 5],
[6, 4, 4],
[6, 3, 7],
[6, 3, 6],
[6, 3, 5],
[6, 2, 8],
[6, 2, 7],
[6, 2, 6],
[5, 5, 5],
[5, 5, 4],
[5, 5, 3],
[5, 4, 7],
[5, 4, 6],
[5, 4, 5],
[5, 4, 4],
[5, 3, 8],
[5, 3, 7],
[5, 3, 6],
[5, 3, 5],
[5, 2, 7],
[4, 4, 7],
[4, 4, 6],
[4, 4, 5],
[4, 3, 7],
[3, 4, 7]
];

var voiceLeadings = [];

class Chord {
	constructor(notes, voiceLeadingOptions) {
		
		this.notes = notes;
		
		this.voiceLeadingOptions = voiceLeadingOptions;
		}
		validate() {
			var intervalStructure = [];
            for(i=0; i<3; i++) {
            intervalStructure.push(this.notes[i+1]-this.notes[i]); 
            }
            var validType = false;
			if(intervalStructures.includes(intervalStructure)){ 
 			validType = true;           
}   	    
return validType;			
			}
		getVoiceLeadingOptions() {
			
       	for(voiceLeading of voiceLeadings) {
    	var potentialChord = new Chord([], []);
		for(i=0; i<4; i++) {
			potentialChord.notes.push((this.notes[i]+voiceLeading[i]));
			}
		if(potentialChord.getType()) {
			this.voiceLeadingOptions.push(voiceLeading);
			}																															
        }
}
		applyVoiceLeading(voiceLeading) {
			var octaveAdjust = false;
     	for(note of this.notes) { 
	    note+=voiceLeading[i]; 
		if(note<12) {	
        	var octaveAdjust = true
     	}
}
        if(octaveAdjust){
	for(note of this.notes) { 
	note = 36+(note%12); 
	}
}
}
};

var currentChord = new Chord([40,47,48,55],[]);

function decodeVectorID(idNo) {
	var vecList;
	var vecString = idNo.toString(3); 
	for(i=0; i<4; i++) {		
	vecList[i] = vecString.charAt(i) - 1;
	}
return vecList;
}


function VectorSet(...vectors){
	voiceLeadings = [];
	
	for(id of vectors) {
voiceLeadings.push(decodeVectorID(id));
}
console.log(voiceLeadings);
};

function changeChord(manualVector) {
	var vectorInput;
	if(manualVector>0) {
		vectorInput = decodeVectorID(manualVector);
		}
	else { 
			currentChord.getVoiceLeadingOptions();
			vectorInput = currentChord.voiceleadingOptions[Math.floor(Math.random()*currentChord.voiceLeadingOptions.length)];
}
currentChord.applyVoiceLeading(vectorInput);
console.log(currentChord.notes);	
};

VectorSet(1, 2, 3, 4, 5, 6, 7, 8);



						
		
	

