import { Module } from "@nestjs/common";
import { PageTemplateModule } from "./page-template/page-template.module";
import { PageModule } from "./page/page.module";
import { SectionPageModule } from "./section-page/section-page.module";
import { SectionModule } from "./section/section.module";

@Module({
    imports: [PageModule, PageTemplateModule, SectionModule, SectionPageModule]
})

export class PageGroupModule {}
