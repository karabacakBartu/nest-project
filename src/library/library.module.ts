import { Module } from '@nestjs/common';
import {LibraryController} from "./library.controller";
import {libraryService} from "./library.service";

@Module({
    imports: [],
    providers: [libraryService],
    controllers: [LibraryController],
    exports: [libraryService],
})
export class MeModule {}
