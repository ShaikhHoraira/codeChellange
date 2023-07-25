
export class ManageDevice {
public payload : object;

constructor(payLooad: object){
    this.payload = payLooad;
}

public async saveData(){
    console.info(this.payload)
    return this.payload
    
}

}
