import { Component, OnInit } from '@angular/core';
import { ChatPage } from '../chat/chat.page';  
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DeliveryService } from "../../services/delivery/delivery.service";

@Component({ 
  selector: 'app-accepted',
  templateUrl: './accepted.page.html',
  styleUrls: ['./accepted.page.scss'],
})
export class AcceptedPage implements OnInit {
 fabAction = false;
  constructor(private modalController: ModalController, private route: Router, private delivery: DeliveryService) { }

  posicion: any;
  pedido: any;
  total: any;

  async ngOnInit() {
    this.posicion = await this.delivery.getPosicionDelivery();
    this.pedido = await this.delivery.getPedido();
    this.total = await this.delivery.getTotal();
  
  }
 
	
toggleFab(){
    this.fabAction = !this.fabAction;
   }
		
  chat(){
    this.modalController.create({component:ChatPage}).then((modalElement)=>
    {
      modalElement.present();
    }
    )
  }
	
delivered_succesfully() {
    this.route.navigate(['./delivered-succesfully']);
  } 
}
