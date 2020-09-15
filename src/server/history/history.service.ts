import {Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

type History = {
	search: string,
	userId: number
}

@Injectable()
export class HistoryService {
	async addHistoryItem({search, userId}: History): Promise<History> {
		const prisma = new PrismaClient()
		return await prisma.history.create({
			data: {search, userId}
		})
	}

	async getHistory(userId: number): Promise<Array<string>> {
		const prisma = new PrismaClient()
		const result = await prisma.history.findMany({
			where: {userId}
		})
		return result.map(({search}: History) => search)
	}
}
