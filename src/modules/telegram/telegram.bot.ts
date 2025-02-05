import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConversionService } from '../conversion/conversion.service';
import { HistoryService } from '../history/history.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private readonly conversionService: ConversionService,
    private readonly historyService: HistoryService,
    private readonly alertService: AlertService,
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

    this.bot.onText(/\/alertar (\w{3}) (\w{3})/, async (msg, match) => {
      const chatId = msg.chat.id;
      const base = match[1].toUpperCase();
      const target = match[2].toUpperCase();

      await this.alertService.addAlert(chatId.toString(), base, target);
      this.bot.sendMessage(
        chatId,
        this.escapeMarkdownV2(
          `🔔 Alerta ativado para *${base} ➡ ${target}*! Você será notificado sobre mudanças significativas.`,
        ),
        { parse_mode: 'MarkdownV2' },
      );
    });

    this.bot.onText(/\/cancelar_alerta (\w{3}) (\w{3})/, async (msg, match) => {
      const chatId = msg.chat.id;
      const base = match[1].toUpperCase();
      const target = match[2].toUpperCase();

      const wasRemoved = await this.alertService.removeAlert(
        chatId.toString(),
        base,
        target,
      );

      if (wasRemoved) {
        this.bot.sendMessage(
          chatId,
          this.escapeMarkdownV2(
            `🚫 Alerta para *${base} ➡ ${target}* foi cancelado com sucesso.`,
          ),
          { parse_mode: 'MarkdownV2' },
        );
      } else {
        this.bot.sendMessage(
          chatId,
          this.escapeMarkdownV2(
            `⚠️ Você não tinha um alerta ativo para *${base} ➡ ${target}*.`,
          ),
          { parse_mode: 'MarkdownV2' },
        );
      }
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
            this.escapeMarkdownV2(
              '📝 Digite no formato: valor moedaOrigem moedaDestino\nExemplo: `100 BRL USD`',
            ),
            { parse_mode: 'MarkdownV2' },
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
            this.escapeMarkdownV2(
              '⚠️ Comando inválido. Escolha uma opção:\n1️⃣ - Converter moedas\n2️⃣ - Ver histórico\n3️⃣ - Ajuda\nOu digite no formato "valor moedaOrigem moedaDestino".',
            ),
            { parse_mode: 'MarkdownV2' },
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
        this.escapeMarkdownV2(
          `✅ Conversão realizada:\n💰 *${amount} ${base.toUpperCase()}* ➡️ *${conversion.convertedAmount.toFixed(
            2,
          )} ${target.toUpperCase()}*\n🔄 Taxa de câmbio: *${conversion.rate}*`,
        ),
        { parse_mode: 'MarkdownV2' },
      );
    } catch (error) {
      this.bot.sendMessage(chatId, '❌ Erro ao realizar a conversão.');
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
          return `📌 ${index + 1}: *${entry.amount} ${entry.base}* ➡️ *${entry.convertedAmount.toFixed(
            2,
          )} ${entry.target}* (Taxa: *${entry.rate}*)`;
        })
        .join('\n');

      this.bot.sendMessage(
        chatId,
        this.escapeMarkdownV2(`📜 *Últimas conversões:*\n${historyMessage}`),
        { parse_mode: 'MarkdownV2' },
      );
    } catch (error) {
      this.bot.sendMessage(chatId, '❌ Erro ao buscar o histórico.');
    }
  }

  private showHelp(chatId: number) {
    this.bot.sendMessage(
      chatId,
      this.escapeMarkdownV2(
        `3️⃣ - Ajuda\n\n` +
          `1️⃣ - Converter moedas 💱: Digite "valor moedaOrigem moedaDestino". Exemplo: "100 BRL USD"\n` +
          `2️⃣ - Ver histórico de conversões:  Veja as últimas conversões realizadas.\n` +
          `🔔 - Alerta:  Ative alertas com "/alertar USD BRL"\n` +
          `🚫 - Cancelar Alerta: Digite "/cancelar_alerta USD BRL" para remover um alerta\n` +
          `3️⃣ - Ajuda ℹ️: Exibe esta mensagem.\n`,
      ),
      { parse_mode: 'MarkdownV2' },
    );
  }

  private sendMenu(chatId: number) {
    this.bot.sendMessage(
      chatId,
      this.escapeMarkdownV2(
        `👋 Bem-vindo ao *Bot de Conversão de Moedas!*\n\n` +
          `🔹 Digite um número para escolher uma opção:\n` +
          `1️⃣ - Converter moedas 💱\n` +
          `2️⃣ - Ver histórico de conversões 📜\n` +
          `3️⃣ - Ajuda ℹ️\n\n` +
          `🔔 Ative um alerta com "/alertar USD BRL"\n` +
          `🚫 Cancele um alerta com "/cancelar_alerta USD BRL"`,
      ),
      { parse_mode: 'MarkdownV2' },
    );
  }

  private escapeMarkdownV2(text: string): string {
    return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
  }
}
