import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../../services/sirket.service';
import { FilterModel } from '../../models/filter';
import { LoginService } from '../../services/giris.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, DemoMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit {
  // Form kontrolü için FormGroup'un tanımlanması
  contactForm: FormGroup;
  // Kullanıcı adı ve şifre değişkenlerinin tanımlanması
  username: any = '';
  password: any = '';
  // Şirketlerin tutulacağı dizi
  companies: any[] = [];
  // Seçilen şirketin özelliklerini tutacak değişkenlerin tanımlanması
  selectedSrkNo: number | undefined;
  selectedSrkSrkno: number | undefined;
  selectedSrkAd: string | undefined;
  kullaniciAdi: string | undefined;
  // Şirket seçim alanı
  sirketSelect: any;

  constructor(
    private formBuilder: FormBuilder,
    private businessService: BusinessService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    localStorage.clear();
    // Form tanımının oluşturulması ve başlangıç değerlerinin atanması
    this.contactForm = this.formBuilder.group({
      srk_ad: [null, Validators.required],
      kullanici_adi: ['', Validators.required], // Kullanıcı adı alanı
      sifre: ['', Validators.required], // Şifre alanı
    });

    this.businessService.getBusinessAll().subscribe(
      (response: any) => {
        this.companies = response.data;
      },
      (error) => {
        this.toastr.error('API bir sorun oluştu.');
      },
    );
  }

   // Giriş işleminin gerçekleştirildiği metot
   onLogin() {
    // Formun geçerli olup olmadığının kontrolü
    if (this.contactForm.valid) {
      // Kullanıcı adı ve şifrenin formdan alınması
      this.kullaniciAdi = this.contactForm.get('kullanici_adi').value;
      const sifre = this.contactForm.get('sifre').value;
      this.selectedSrkAd = this.contactForm.get('srk_ad').value;


      const selectedCompany = this.companies.find(company => company.srk_ad === this.selectedSrkAd)


    if (selectedCompany) {
      this.selectedSrkSrkno = selectedCompany.srk_srk_no;
      this.selectedSrkNo = selectedCompany.srk_no;

      localStorage.setItem('srk_no', selectedCompany.srk_no);

    } else {
      console.error('Company not found for srk_ad:', this.selectedSrkAd);
    }
      //Seçilen şirketin numarasının local storage'a kaydedilmesi

      // Giriş işlemi için kullanılacak filtre modelinin oluşturulması
      const filter: FilterModel = {
        filterValue1: this.selectedSrkSrkno,
        filterValue2: this.selectedSrkNo,
        filterValue20: this.kullaniciAdi,
        filterValue21: sifre,
      };

      // Giriş servisine filtre modeli ile isteğin gönderilmesi
      this.loginService.postLogin(filter).subscribe(
        (response) => {
          // Giriş başarılı ise
          if (response.access === true) {
            // Yönlendirme ve kullanıcı bilgilerinin local storage'a kaydedilmesi
            this.router.navigate(['/home']);
            localStorage.setItem('us_ad', this.selectedSrkAd);
            localStorage.setItem('cmpt_token', response.cmpt_token);
            localStorage.setItem('kullanici_adi', this.kullaniciAdi);
          }
          // Giriş başarısız ise
          else if (response.access === false) {
            this.toastr.error('Kullanıcı adı veya şifre hatalı');
          }
        },
        (error) => {
          this.toastr.error('Giriş işleminde bir sorun oluştu.');
        },
      );
    }
    // Form geçerli değilse
    else {
      this.toastr.error('Form geçerli değil!');
    }
  }
}
