function Widget (div,dim,group,chartGroup){
 
        this.div=div;
        this.dim=dim;
        this.group=group;
 
        if(group==undefined){
                this.chartGroup="";
        }else{
                this.chartGroup=chartGroup;
        }
 
        this.draw=function(){
                dc.renderAll(this.chartGroup);
        }
 
}
