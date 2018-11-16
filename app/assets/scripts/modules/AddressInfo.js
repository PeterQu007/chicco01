// Analyse the address information

class AddressInfo {

    constructor(address, houseType, formal) {
        address = address.replace('.', '');
        this.isFormalAddress = (formal == undefined ? false : formal);
        this.houseType = houseType;
        this.addressParts = address.split(' '); //split the address to parts array
        //fetch unit no, then remove unit no from the addressParts Array
        this.UnitNo = '';

        switch (houseType.toUpperCase()){
            case 'TOWNHOUSE' :
            case 'APARTMENT' :
            case 'APARTMENT/CONDO' :
            case 'CONDO' :
            case 'ATTACHED' :
                houseType = 'Attached';
                break;
            default :
                houseType = 'Detached';
                break;
        }

        if(this.isFormalAddress){
            if ( houseType == 'Attached' ) {
                this.UnitNo = this.addressParts.pop();
                this.addressParts.pop();
            }
        }else{
            if ( houseType == 'Attached' ) {
                this.UnitNo = this.addressParts.shift() ;
            }
        }
     
        this.streetNumber = this.addressParts.shift();
        this.streetType = this.addressParts.pop();
        this.streetName = this.addressParts.toString().replace(',','-');
        var streetType = this.streetType.trim().toString().toUpperCase();
        //Standard street type:
        switch (streetType){
            case 'AVENUE' :
                streetType = 'AV';
                break;
            case 'STREET' :
                streetType = 'ST';
                break;
            case 'DRIVE' :
                streetType = 'DR';
                break;
            case 'BOULEVARD' :
                streetType = 'BV';
                break;
        }
        this.streetType = streetType;
        this.formalAddress = this.streetNumber + " " + this.streetName.replace('-',' ') + " " + this.streetType;
        if (this.UnitNo){
            this.formalAddress = this.formalAddress + " UNIT# " + this.UnitNo;
        }
        this.addressID = '-' + this.streetNumber + '-' + this.streetName + '-' + this.streetType;
    }

};

export default AddressInfo;