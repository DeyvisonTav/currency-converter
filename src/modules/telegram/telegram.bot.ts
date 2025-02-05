import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConversionService } from '../conversion/conversion.service';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private readonly conversionService: ConversionService,
    private readonly historyService: HistoryService,
  ) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN não está definido no .env');
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.initializeCommands();
  }

  private initializeCommands() {
    this.bot.onText(/\/start/, (msg) => {
      this.sendMenu(msg.chat.id);
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text.trim();

      if (text.startsWith('/')) {
        return;
      }

      if (/^\d+(\.\d+)? \w{3} \w{3}$/i.test(text)) {
        await this.handleConversion(chatId, text);
        return;
      }

      switch (text) {
        case '1':
          this.bot.sendMessage(
            chatId,
            '📝 Digite no formato: valor moedaOrigem moedaDestino\nExemplo: 100 BRL USD',
          );
          break;

        case '2':
          await this.showHistory(chatId);
          break;

        case '3':
          this.showHelp(chatId);
          break;

        default:
          this.bot.sendMessage(
            chatId,
            '⚠️ Comando inválido. Escolha uma opção:\n1️⃣ - Converter moedas\n2️⃣ - Ver histórico\n3️⃣ - Ajuda\nOu digite no formato "valor moedaOrigem moedaDestino".',
          );
      }
    });
  }

  private async handleConversion(chatId: number, query: string) {
    try {
      const [amount, base, target] = query.split(' ');
      const conversion = await this.conversionService.convertCurrency(
        parseFloat(amount),
        base.toUpperCase(),
        target.toUpperCase(),
      );

      await this.historyService.saveConversion({
        ...conversion,
        chatId: chatId.toString(),
      });

      this.bot.sendMessage(
        chatId,
        `✅ Conversão realizada:\n💰 *${amount} ${base.toUpperCase()}* ➡️ *${conversion.convertedAmount.toFixed(
          2,
        )} ${target.toUpperCase()}*\n🔄 Taxa de câmbio: *${conversion.rate}*`,
        { parse_mode: 'Markdown' },
      );
    } catch (error) {
      this.bot.sendMessage(
        chatId,
        '❌ Erro ao realizar a conversão. Verifique os parâmetros e tente novamente.',
      );
    }
  }

  private async showHistory(chatId: number) {
    try {
      const history = await this.historyService.getHistoryByChatId(
        chatId.toString(),
      );

      if (history.length === 0) {
        return this.bot.sendMessage(chatId, '📜 Nenhum histórico encontrado.');
      }

      const historyMessage = history
        .slice(0, 5)
        .reverse()
        .map((entry, index) => {
          const convertedAmount = Number(entry.convertedAmount);
          const rate = Number(entry.rate);

          return `📌 ${index + 1}: *${entry.amount} ${entry.base}* ➡️ *${convertedAmount.toFixed(
            2,
          )} ${entry.target}* (Taxa: *${rate}*)`;
        })
        .join('\n');

      this.bot.sendMessage(
        chatId,
        `📜 *Últimas conversões:*\n${historyMessage}`,
        { parse_mode: 'Markdown' },
      );
    } catch (error) {
      console.error('Erro ao buscar o histórico:', error);
      this.bot.sendMessage(
        chatId,
        '❌ Erro ao buscar o histórico. Tente novamente mais tarde.',
      );
    }
  }

  private showHelp(chatId: number) {
    this.bot.sendMessage(
      chatId,
      `ℹ️ *Ajuda*\n\n` +
        `🔹 *Converter moedas:* Digite "valor moedaOrigem moedaDestino". Exemplo: "100 BRL USD"\n` +
        `🔹 *Histórico:* Veja as últimas conversões realizadas.\n` +
        `🔹 *Ajuda:* Exibe esta mensagem.\n` +
        `🔹 *Exemplo:* Digite "50 EUR USD" para converter 50 euros para dólares.`,
      { parse_mode: 'Markdown' },
    );
  }

  private sendMenu(chatId: number) {
    this.bot.sendMessage(
      chatId,
      `👋 Bem-vindo ao *Bot de Conversão de Moedas!*\n\n` +
        `🔹 Digite um número para escolher uma opção:\n` +
        `1️⃣ - Converter moedas 💱\n` +
        `2️⃣ - Ver histórico de conversões 📜\n` +
        `3️⃣ - Ajuda ℹ️`,
      { parse_mode: 'Markdown' },
    );
  }
}
