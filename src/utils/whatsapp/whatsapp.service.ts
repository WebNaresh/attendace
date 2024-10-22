import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import {
  CreateWhatsappDto,
  WhatsappMessagePayload,
} from './dto/create-whatsapp.dto';

@Injectable()
export class WhatsappService {
  // Simple function to log and throw errors for axios requests
  handleAxiosError(error: any) {
    console.error(
      'Axios request failed:',
      error.response?.data || error.message,
    );
    throw new HttpException(
      'Failed to send WhatsApp message',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async hello_world() {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/437010516154310/messages`,
        {
          messaging_product: 'whatsapp',
          to: '919371505828',
          type: 'template',
          template: {
            name: 'hello_world',
            language: {
              code: 'en_US',
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`🚀 ~ WhatsappService ~ response:`, response);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async send_text_message(text: string) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/437010516154310/messages`,
        {
          messaging_product: 'whatsapp',
          to: '919371505828',
          type: 'text',
          text: { body: text },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`🚀 ~ WhatsappService ~ response:`, response);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async send_image_link() {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/437010516154310/messages`,
        {
          messaging_product: 'whatsapp',
          to: '917219725697',
          type: 'image',
          image: {
            link: 'https://neststudyroom.s3.ap-south-1.amazonaws.com/main_logo.png',
            caption: 'This is a caption',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`🚀 ~ WhatsappService ~ response:`, response);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async send_media_pdf() {
    try {
      const data = new FormData();
      data.append('messaging_product', 'whatsapp');
      data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), {
        contentType: 'image/png',
      });
      data.append('type', 'image/png');

      const response = await axios.post(
        `https://graph.facebook.com/v20.0/437010516154310/media`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
          },
        },
      );
      console.log(`🚀 ~ WhatsappService ~ media upload response:`, response);

      const response2 = await axios.post(
        `https://graph.facebook.com/v20.0/437010516154310/messages`,
        {
          messaging_product: 'whatsapp',
          to: '917219725697',
          type: 'image',
          image: {
            id: response.data.id,
            caption: 'This is a caption',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response2.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  limitText = (text: string, limit: number) => {
    return text.length > limit ? text.slice(0, limit) : text;
  };

  // Example of payment reminder with error handling
  async send_payment_reminder(props: CreateWhatsappDto) {
    console.log(`🚀 ~ WhatsappService ~ send_payment_reminder props:`, props);
    const {
      library_name,
      library_contact,
      library_url,
      student_email,
      student_name,
      student_contact,
    } = props;

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/431174140080894/messages`,
        {
          messaging_product: 'whatsapp',
          to: `91${student_contact}`,
          type: 'template',
          template: {
            name: 'abhyasika_payment_reminder',
            language: { code: 'en' },
            components: [
              {
                type: 'header',
                parameters: [
                  { type: 'text', text: this.limitText(library_name, 60) },
                ],
              },
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: this.limitText(student_name, 60) },
                  { type: 'text', text: this.limitText(library_name, 60) },
                  { type: 'text', text: this.limitText(student_email, 60) },
                  { type: 'text', text: this.limitText(library_contact, 60) },
                ],
              },
              {
                type: 'button',
                sub_type: 'url',
                index: '0',
                parameters: [
                  {
                    type: 'text',
                    text: this.limitText(
                      `library_redirect_method/${library_url}`,
                      60,
                    ),
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // Similar error handling for pending_payment
  async pending_payment(props: WhatsappMessagePayload) {
    console.log(`🚀 ~ WhatsappService ~ pending_payment props:`, props);
    const {
      library_name,
      library_contact,
      library_url,
      student_email,
      student_name,
      student_contact,
    } = props;

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v20.0/431174140080894/messages`,
        {
          messaging_product: 'whatsapp',
          to: `91${student_contact}`,
          type: 'template',
          template: {
            name: 'abhyasika_pending_payment',
            language: { code: 'en' },
            components: [
              {
                type: 'header',
                parameters: [
                  { type: 'text', text: this.limitText(library_name, 20) },
                ],
              },
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: this.limitText(student_name, 60) },
                  { type: 'text', text: this.limitText(library_name, 60) },
                  { type: 'text', text: this.limitText(student_email, 60) },
                  { type: 'text', text: this.limitText(library_contact, 60) },
                  { type: 'text', text: this.limitText(library_name, 60) },
                ],
              },
              {
                type: 'button',
                sub_type: 'url',
                index: '0',
                parameters: [
                  {
                    type: 'text',
                    text: this.limitText(
                      `library_redirect_method/${library_url}`,
                      60,
                    ),
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }
}
