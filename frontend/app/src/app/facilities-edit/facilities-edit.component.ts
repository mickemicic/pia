import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';


export class Inventory{
  code: number;
  title: string;
  unit: string;
  tax: number;
  
  producer: string;
  origin: String;
  foreignTitle: String;
  barcode: number;
  customsTax: String;
  ecoTax: String;
  minStock: number;
  maxStock: number;
  description: String;
  declare: String;
  
  getPrice: Array<number>;
  sellPrice: Array<number>;
  lager: Array<number>;
  minStockW: Array<number>;
  maxStockW: Array<number>;

  logo:string;
}

@Component({
  selector: 'app-facilities-edit',
  templateUrl: './facilities-edit.component.html',
  styleUrls: ['./facilities-edit.component.css']
})
export class FacilitiesEditComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn"))==true){
      var user = JSON.parse(localStorage.getItem("user"));
      switch(user.type){
        case(-1):
        this.router.navigate(['/businessNew']);
        break;
        case(-2):
        this.router.navigate(['/businessInactive']);
        break;
        case(2):
        this.router.navigate(['/user']);
        break;
        case(0):
        this.router.navigate(['/admin']);
        break;
      }
    }
    else
      this.router.navigate(['']);

    
    this.user = user;
    this.skladistaId = new Array<number>();
    this.skladistaNaz = new Array<String>();

    
    this.skladistaId = user.skladista.id;
    this.skladistaNaz = user.skladista.naziv;
    
    

    this.logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAABEnSURBVHjaYvz//z/DKCAOAAQQ42hgEQ8AAmg0sEgAAAE0kIH1/9+n/38u/ft96f+/j0AuE6seM4c3soJ/vy///bnl38/DjMxyjMzyQJKJRZ6JzWagHAwQQPQOrP9/Hv39vgUYQH9/HWb495GZ04eZ05eJzZaRiQ9PmP79sRmoC4ggIsBgZWLVZWK3BerFo5HqACCA6BRY/35d/vNlCdC3//88ZGTiZ+byBSFOb1JT4t/vm/9+BZpzGC7IxKbHwhMDDHRGFjla+wIggGgbWCDvfVny5/OSf78ugSxjkWcVrAIGE4XJAZg8f3+a+vfzEkj+hQBmDltm3hgWnmjaeQcggGgVWCD/fJj29xPUP8xctiz82czc3lSOia+bf79rA9qF8A+LHAswyASyaZE9AQKI+oEF9MPvV2V/Pi2FWsAqxy4xk4mThqUy0K7fb9v+/0YKMiZ+FsFsIKJukAEEEJUD6/eb9j/vpv7/C0pNjMz8rOKdLPzRDHQBfz4u/f0GNchY5FhFq6joAIAAolpg/ft65OfTdLhbWQSjWSW66FlVQWPrNSK2oGUZty2b1AxgAqfccIAAokJg/f/76ffLtj9vpkJNZOZnV1jBxD1grSFghP16Xv734xaEJ4FpXKyKRSSLQpMBAojSwPr3/fKvhxn/flyCRiO/D5vcTEZmPoaBBn8/bv31KB0liVHsNoAAoiiw/rxd+vtxOdxBrFJVrJKVg6d38v/Xo593I/99v4TwLZscu/IKJk5d8gwECCDyA+v307bfz9rg6ZxNaSazgM8g7ND9epDx580S5CzJpkimUwECiMzA+nU348/rJbBKh59dawcTly7DYAV/3iz9dTcdWYRNeSaLCMm1JEAAkRNYv+5k/HkFCyl2eXYNYHE+eEMKGl6vl/66gxFeYqSFF0AAkRxYv24hQoqJW49db8dgKM6JCq9XS3/dRg0vVdLCCyCAWEgLqZsZf14gch+b2syhElIgrwLD5T/QC4jw+nUjHSjCIk5seAEEEBMJJfqD9j/PljL8YwQiRiYBdv0dgz/3oYeXeDSbUhfDPwY4+nU9/e+brURqBwggYrPhn+dLf13LgHPZ9VYwi3ozDE3w83Lk39dITVZgBWW0nYmHcMQDBBBRKevf58u/r5fDY4NNtXPohhSoqNKcycguB/fO/18ff13N+P/nE0GNAAFEOLCApvy6lAE0keEvsF3MwCziwyKXxTCUASMLH7vWTOTM+O/jpV+X0wlqBAggwoH1+1bbvw+XICHFyMTPpjuTCt3d2+3fD2h/284LRD9Pev15MI2YiKUiYBK0YZGIhngKgv6+2PLnyVL8ugACiECZ9e/tkR/HPBFFlekKZglvykMKGAGY4sziPiwyMZSbT2xn6M+nH/u0/v9GdB4ZWfk5bI8xcuIcnwAIICa83fdPP8+mw8Me6Bmq+OTf68PIUYqI22dbfp6K+L5d5tf5jL8viK2h/n9/RHZmZFHIRnbA/x8ff10ux6MFIIDwBdafO1P+f3nI8O8/BLHpdFInTv/hQ/9/fvzzcOnPExHft8j8Opvx9zmBUAMqJr8loZgN7Coi2w6MsH9vjuBSDxBAOAPr/7dHv6+2wU1h1ahi5KLS9Akw6P9CEbBW4gr4zOl2lUUmGi4IQf9/fvjzYMnPY+Hf1vL8POT5+3rbv9fo3vj38fKfW1PIL+lZ+Zgx7P15GmdJDxBAOMusX6cy/txfgsjMvteBRpM7Gvfp/wfQOMnf14dAaeHB0v9fH0JN5pZnN4XWGP++Pvx9oQy5EMHuYm55JnC0AVX+AxvLFfqF/JLr26PvW7XQ2xamM1kUsDTrAQIIe2D9//ro+0aEEax6Vaw6VeQF0+9zZcAEQsNGuVo2myFF5cOPnVaQQEcECpc8p+9VTJUAAYS9b/j7EjgDIvJ2DDm57dWRn4fCQQ00CptFbPws6tnM4nZIo3ofIN5jEtBjlqF0EI1FIebX2TKUOP788M+9pSxK6IkLIIBYsA0wfvpzG1hqMkJrdFkfRm6SSyugZb+OpVOpjAOWAwJMYiiD+pSHEaLYFrNFThnw5IIZWAABhKWA/3NtKnKFyqJMcrL69/LIryMZkC435ej/j0+/TpV/X6v99/FWWmRkJkFdRhYBdEs/PQL6Ak0lQABhC6ybS+AhBaxZmeVIblv9PJSOtSVFCQK6/ueeiJ/bvf5/eUT98OLXw7Txz230ohYggNAD69/zI/8/PoK3GJjlyEntIBOoHVjQhuvTwz/WWYFLCaoGlrgtlsC6sRRYIiErAwgg9MD6c2MJciONSdKWrAqZhgjYav11IAOIqNm1ZuPHatffB5uRlQEEEHpg/b2zBTl0mRV9yalfVKJplLKQo/3XfqqFF5OQHvaEfH8LsjKAAEKpDf+9ufz/O1LHkk+OkY2chiirdde/V5f/vUFpvDBL2zJrRjMJ6zGJ6IKr50dAp/y+MBXIIM+Hf64tBQ2uOc+gToD9xSYGTDruCC5AADGhyyHnQWE9clM1H3vgdha9bMR4odMM9oBtLOrRkJACqeGVY9HL4oy7ympahb+3iAcBw+vvPSpUkX+fHMZlxb+niDoRIIBQAuvfo0PIvSS4x8gLLzbbDo6g7cxStsBAZ9HEOSnAalbJZttJdnj9OlBGjfEanOaDwhEGAAIINbCeX0JWx8grT2lZIG3DHryNPXg7gTLOIItZygatQ0sk+v/hIbBVQcW+PRoCJSAYAAggJqTeyeX/Pz6iZEN+eerUNeyECz4Ww2zym2AfH1EhZeEwHJSAYAAggBAFPDCK0As5Oq5jhsbTAIH/Hx7hsh1Y4wFTLrCuA7IBAggRWP9eXGb4y4iSIsT16OTWn59+H2ojP7AojtT/7x/isR0YlJDAAgggJnQNyGUWO51mm3/vKvv/7iH5zS52fkoD69tHPOb/ewHNiQABhJQN3z2if0YAFjc/V0aCXcNIQWeF0onxf88v43EAvO0JEEAs6NUnshEvLjNJ6NKskPr058TU3wfaKDSHWcGW0pAClj94Uwk8sAACCKnMenIJvYD//pEWwfT3xtY/55f8vb6FKqYxq/tQHFiXCAQWrEIECCAWlHxL7YITPSkdm/rn3BJQ1UM9wKxJcWDdPUyg/IHJAgQQC0rDDE3N00tMSjbUCaajU/8cmQpqH1AVMGv5MApQOuf09+5hrB1DzMACCCAWPD3J/98/UCHTXd3ya3X6f9rkaFbrbIobDY/+v31IuH0PBgABhC+w/t06zOBGUYL6vbHsz2laTe0wK9tSnvD/XtlCIFkhpSyAAGLBFEIIPL5ESUj9nOLx79klBpoBtggqLFH5c3IJ4QYTrHwCCCAW5NFCtMzy/8tHYOOLUYjkQgGo60e3JY2yHjQDelQxClJaWv17ehnUBmAgNmUBBBAT0giBHpYBiluHSQ6p759+zo4ABjTthkmZJPWAgUWFZLV/KjHWMUpBu30AAcSEEn6YgXWe5NbQr0Xp/x5dInt8iiBiZOdni6FCBgQm/z/HlxBlIwe0OwUQQEjZUEie4S96Ovp3/RBpcXV86d/zm2naQ2IN6WKSpkK/4teqcsJFO2o2BAggJqTAksMyVPT5I/GJC5gBf68so12aAiIWp2wWCyrsH/x7Ycvfc5uJtJRZDbpyACCAkMosWT3sOfEssYH19+gSUFFFu5CyjGELo8IaMWCk/pqbToLVnNBsCBBASIElhz2w/hxc8v8bUQs+f++cSrtCnVFQnjWiiyoZ+dekcJLqHyZZaK4HCCCkbCgiByw7sU+fHSLcsPz/5tH/Vw9pl6xY/asYOakwvvZrTsbfa4eJt5dZDTGqARBAKBMWoJyILbB+b5lKOA+e3ULTWVVmI18qhNSsjD8HlpCWomURw8UAAYQaWFq28BWkyOj/ywd/DhBYXvDvPg2bC8BYZOSi7CiIb59+9kaCQopEq5k1ESkLIIBQAovZ1BeXnt8rWwm45uVD2iUrYKVMUUv94eWfjR5/T20mpwGsiVhEBxBAqClLQZdRRB77IuIXD//sx5u4/v/HmiqpgoBJ+//rR+QlqF8Lyn+UWPy7d5EMe5nkdJFTNEAAoS8MYda2xZm4lrXiqxb/0Rb9mldGajD9XtX2I0Pjz+YpZFsKympIACCA0AOLxSkGZ154/vDPhin4uua0DKy/Jzb/XtFGTBj92bf0Z3vE92jJ38tbQfmXAkuZzVACCyCA0NeUMunYMogpgAogrC2p9VNZXGIYxeRwpiyazpgtb/13+RCzcyyLE0oj/t+Vw/+/fvwLJO9dBJLUso5JUQ9YLiGLAAQQlgW4rE7Rv5ZgL87/f/7wsyeNo2sHzpRFY/D30mEg+tWfBvQJtAqmGQBlMlQAEEBY1sH///rpW6AkvlG3zC7WQPTx3J/9GX/2LGEYRoBr1TNGbpT2CkAAYVmAC1QBzGt4atPfC1r/v0Svm5hE5chbBjM4ETCno4UUEAAEEPa9O2zx1XhXrXz82Z6GbpCyHk2XktIZscVWYwYLQABhDyxGcTkW9xh8ddO5w7/no9RNjGLytF5HSjeEqxIDCCCcG53+v3j0PcEC1DvHDTjaVzLbIuY4vzpyD5PSasV1YHLBFAcIIJxb6Bgl5FhDc/DHwM+mtH+3LyMatHq2tG6a0gGxBudgDSkgAAggfJszWcJzGCXk8S1J//zxZ3Pa/y/QZj2Tiv5QDylGLn7WxGpcAQIQQPgCi5GHj712Jv7E9e/6pZ8lYdCUZWA71EsrttxuzEoQDgACiMDue2YjW9aIHAIdkdOH/2wG9bGZDO2GdLICRjaLF74BfoAAInxUAWt6NZOKLoElw08fQFIis6HtEG0rMPLws3etwh8UAAFEOLBAmbFpNiO3AJ5dbsDEBU2Jdr5DNAOy184C+hR/UAAEENFn0Wxc+rMqDY8C7qtfwTP+n77ZSgy5tgJrdA5bCeHZEIAAIvaUIxb/aLasanwl194t0Jzo4DvEiioHX2JCCggAAoiEI6FYs6tY/HH2Gf/s3gyPJWrtYaUDYlLTZ2+eTWQIAAQQySez/SxP/7MW++gC1/nnjLygbP8jwePvqcODP/cxaehxLNpJsKiCA4AAYiLVAvbOmSxB2NPXn3lTYGmwevDnPiZ1PY6FJIQUEAAEEJmnSf4sSf+zCj19MfLxc+48wSgN6iv8iPH4e3LwJi4mTT2OpTsh+YB4ABBAFJxT2t/2qw99QJXZ3ZdjzgpQtfj00Xcfi/+fPg7CkGI2t2WfuYrUkAICgACi6ATcvzu3/MxPQwsRjnkrmT1AQxF/1i79WZw22EKKJTSGvZvM5V0AAUTx2cpXL//MS/t3BelIXn5+zjM3GPlA8fazOP3P6sEy1gwsJdgaullCyF+xBBBA1Di1+9On312tv2dOQZoi0uPcfxxauhVhKd0GoJDS1mPvn8WkRdEqOIAAotp58H+PHv6Zk/7/EXQOjSUyhn0KNLX/LEz/s2Igw4utpJq1mAprUAECiNo3DXS0/p4+5f9HUCnGmpnD1g5tGf9ZuRSYWwegLLeyZZ88i1GGOid/AQQQDe6wAObKtpbfU0G5kn3GLJboGETplo1SutE2mKxtWcurgYFFRTMBAohmt6M8egQMrz+LF7Nm57BWI8Yef3e1wZMerYLJxhaYqJk9qX/eOkAA0fjenU+f/kya/P/DR7YeRE/1/+NHv9pb/yxbTP1mQVQsMCED0xSNvAMQQPS40en/x0+M/OgtQFCQtbb+WUqFIGP28WXx9WX28YO0V2gHAAJogG+hAyW9JYuBufXfJdLKMiY9PWY7O2ZbOyY7O1qHERwABNBgubIPWMb92bT538VL/y5dBJLoQaOvx8gvACLl5YEkk74+3QIIGQAE0Oj9hiQAgAAaDSwSAECAAQBL4MHFPMTxMAAAAABJRU5ErkJggg=="

    this.item = JSON.parse(localStorage.getItem("item"))

    this.code = this.item.code;
    this.title = this.item.title;
    this.unit = this.item.unit;
    this.tax = this.item.tax;
    
    this.producer = this.item.producer;
    this.origin = this.item.origin;
    this.foreignTitle = this.item.foreignTitle
    this.barcode = this.item.barcode
    this.customsTax = this.item.customsTax
    this.ecoTax = this.item.ecoTax
    this.minStock = this.item.minStock
    this.maxStock = this.item.maxStock
    this.description = this.item.description
    this.declare = this.item.declare
  
    this.getPrice = this.item.getPrice
    this.sellPrice = this.item.sellPrice
    this.lager = this.item.lager
    this.minStockW = this.item.minStockW
    this.maxStockW = this.item.maxStockW

    if(!this.getPrice)
      this.getPrice = new Array<number>(this.skladistaId.length);
    if(!this.sellPrice)
      this.sellPrice = new Array<number>(this.skladistaId.length);
    if(!this.lager)
      this.lager = new Array<number>(this.skladistaId.length);
    if(!this.minStockW)
      this.minStockW = new Array<number>(this.skladistaId.length);
    if(!this.maxStockW)
      this.maxStockW = new Array<number>(this.skladistaId.length);
  }

  user: Business;
  item: Inventory;

  code: number;
  title: string;
  unit: string;
  tax: number;
  
  producer: string;
  origin: String;
  foreignTitle: String;
  barcode: number;
  customsTax: String;
  ecoTax: String;
  minStock: number;
  maxStock: number;
  description: String;
  declare: String;
  
  skladistaId: Array<number>;
  skladistaNaz: Array<String> 

  getPrice: Array<number>;
  sellPrice: Array<number>;
  lager: Array<number>;
  minStockW: Array<number>;
  maxStockW: Array<number>;

  message: string;

  file: File;
  name: string;
  imgH: number;
  imgW: number;

  logo:string;

  isImageSaved: boolean;

  onFileSelected(fileInput) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      this.file = fileInput.target.files[0];
      this.name = this.file.name;

      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          this.imgH = img_height;
          this.imgW = img_width;

          console.log(img_height, img_width);


          if (img_height > max_height || img_width > max_width) {
            this.message = "Максималне димензије слике су 300px*300px"
          } else if(img_height < min_height || img_width < min_width){
            this.message = "Минималне димензије слике су 100px*100px"
          } 
          else {
              const imgBase64Path = e.target.result;
              this.logo = imgBase64Path;
              this.isImageSaved = true;
              // this.previewImagePath = imgBase64Path;
          }
        };
      };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }



  updateItem(){
    this.service.erase(this.item, this.user.username);
    this.service.addItem(this.code, this.title, this.unit, this.tax, this.producer, this.origin, this.foreignTitle,
      this.barcode, this.customsTax, this.ecoTax, this.minStock, this.maxStock, this.description, this.declare,
      this.getPrice, this.sellPrice, this.lager, this.minStockW, this.maxStockW, this.logo, this.user).subscribe((resp=>{
        if(resp['message']=='item added'){
          this.service.getUserPIB(this.user.pib).subscribe((res: Business)=>{
            this.user = res})
            localStorage.setItem("user", JSON.stringify(this.user))
            this.router.navigate(['facilities'])
        }
        else if(resp['message']=='existing item'){
          this.message = "Већ постоји артикал са унетом шифром."
          return;
        }
        else{
          alert('Дошло је до грешке, молимо покушајте касније.');
          this.router.navigate(['business']);
        }
      }))
  }
}
