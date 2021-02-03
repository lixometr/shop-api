import { Module } from "@nestjs/common";
import { PageTemplateModule } from "./page-template/page-template.module";
import { PageModule } from "./page/page.module";

@Module({
    imports: [PageModule, PageTemplateModule]
})

export class PageGroupModule {}
