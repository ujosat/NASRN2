export default state => 

{
    
state?.data?.filter(function(obj){
    
   var db= obj.vendor_id==state.operator && obj.plan_type==state.activeFilter;
   console.log(db)
   return db;
});
};
