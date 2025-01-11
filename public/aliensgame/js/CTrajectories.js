function CTrajectories() {
		
		this.CTrajectories=function() {
			
		};
		
    this.quad=function(iT,aP){
            var iResult;
            var ioneMinusTSq = (1-iT) * (1-iT);
            var iTSq = iT*iT;
            iResult = ioneMinusTSq*aP[0]+2*(1-iT)*iT*aP[1]+iTSq*aP[2];
            //console.log(iResult);
            return iResult;
        };
		
}

			