import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertUtil {

  constructor(public alertCtrl: AlertController){

  }

  showAlertWithMessage(message: string){
    let alert = this.alertCtrl.create(this.messageToAlert(message));
    alert.present();
  }

  showAlertWithObject(message: Object){
    let alert = this.alertCtrl.create(message);
    alert.present();
    return alert;
  }

  private messageToAlert(message: string){
    switch(message){
      case 'create-event/error':
        return {
          title: 'Erro ao criar evento!',
          subTitle: 'Por favor, preencha todos os campos.',          
          buttons: ['OK']
        }
      case 'auth/network-request-failed':
        return {
          title: 'Erro de conexão!',
          subTitle: 'Ocorreu algum problema na conexão! Tente novamente dentro de alguns minutos.',
          buttons: ['OK']
        }
      case 'auth/invalid-email':
        return {
          title: 'Email Inválido!',
          subTitle: 'O email informado deve ser um email válido!',
          buttons: ['OK']
        }
      case 'auth/wrong-password':
        return {
          title: 'Senha errada!',
          subTitle: 'A senha informada está incorreta!',
          buttons: ['OK']
        }
      case 'auth/user-not-found':
        return {
          title: 'Usuário não encontrado!',
          subTitle: 'Certifique-se de que o email informado está correto!',
          buttons: ['OK']
        }
      case 'auth/password-doesnt-match':
        return {
          title: 'Senhas não combinam!',
          subTitle: 'Certifique-se de que as senhas informadas são iguais!',
          buttons: ['OK']
        }
      case 'auth/email-resetpassword-sent':
        return {
          title: 'Email enviado!',
          subTitle: 'Um email para redefinir a senha foi enviado para o email informado!',
          buttons: ['OK']
        }
      default:
        return {
          title: 'Erro interno!',
          subTitle: 'Ops! Infelizmente aconteceu um erro interno. Tente novamente em alguns minutos.',
          buttons: ['OK']
        }
    }
  }
}