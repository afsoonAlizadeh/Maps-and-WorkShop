import { Component, OnInit } from '@angular/core';
import { SymmetricConfig } from '../auth/interfaces/symmetric';
import { EncryptionService } from '../auth/services/encription.service';
import { TokenService } from '../auth/services/token.service';
import { symmetricKey } from '../enviroments/enviroment.env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'reha';
  config :SymmetricConfig = {
    os:'linux',
    user_agent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    resolution:'1080x920'
  }

  constructor(private tokenService: TokenService){}

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    // const encryptionService = new EncryptionService(symmetricKey);
    // const encryptedData = encryptionService.encrypt(this.config);
    // this.tokenService.fetchToken(encryptedData).subscribe();
  }
}
