import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SkiperWalletsHistoryService } from './skiper-wallets-history.service';
import { ParseIntPipe } from '@nestjs/common';
import { SkiperWalletsHistoryInput } from './skiper-wallets-history.dto';

@Resolver('SkiperWalletsHistory')
export class SkiperWalletsHistoryResolver {
    constructor(
        private readonly skiperWalletHistoryService: SkiperWalletsHistoryService
    ) { }

    @Query('SkiperWalletsHistory')
    async SkiperWalletsHistory() {
        return await this.skiperWalletHistoryService.getAll();
    }

    @Query()
    async searchSkiperWalletHistory(@Args('id', ParseIntPipe) id: number) {
        return this.skiperWalletHistoryService.getById(id);
    }

    @Query()
    getGanaciaDelDia(
        @Args('idwallet') idwallet: number,
        @Args('lat') lat: number,
        @Args('lng') lng: number,
        @Args('flat') flat: boolean = false
    ) {
        return this.skiperWalletHistoryService.getGanaciaDelDia(idwallet, lat, lng, flat);
    }

    @Query()
    getBalanceEnabled(@Args('idwallet') idwallet: number) {
        return this.skiperWalletHistoryService.getSaldoHabilitado(idwallet);
    }

    @Mutation()
    registerSkiperWalletHistory(@Args('input') input: SkiperWalletsHistoryInput) {
        return this.skiperWalletHistoryService.registerSkiperWalletHistory(input);
    }
}
