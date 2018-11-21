import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AllshoplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allshoplist',
  templateUrl: 'allshoplist.html',
})
export class AllshoplistPage {

  responseData:any;
  shoplists:any;
  loguser:any;
  
  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public phone:any;
  public no_records_found:any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {

      this.languages = JSON.parse(localStorage.getItem('language'));
      //console.log('Arunavalang',this.languages)
      if(this.languages){
        this.selectedlanguage = this.languages.language;
      }else{
        this.selectedlanguage ='1';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllshoplistPage');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.allshopList();
    
  }
ChangeToUserLaguage(lang){
    //alert(lang+'a')
      let serval={
        "language_id":lang,
       };
       let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
   
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.phone=res.languages.phone;
         this.no_records_found=res.languages.no_records_found;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  allshopList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    //console.log('sp',this.loguser);
    let serval={
      "user_id":this.loguser.user_id
    }
    
    this.authService.postData(serval,'allShopListing').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.shoplists =  this.responseData.allshoplist;
         //console.log('arunava',this.productlists)
      }
      else
      {
        loading.dismiss();
        this.shoplists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}


productlist(id){

this.navCtrl.push('ShopproductlistPage',{"shopid":id});
  
}



}
