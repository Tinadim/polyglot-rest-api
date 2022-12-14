object Dependencies {
    val guice = "com.google.inject:guice:${Versions.googleGuice}"
    val guava = "com.google.guava:guava:${Versions.googleGuava}"
    val logback = "ch.qos.logback:logback-classic:${Versions.logback}"

    val vertxConfig = "io.vertx:vertx-config"
    val vertxCore = "io.vertx:vertx-core"
    val vertxDepChain = "io.vertx:vertx-stack-depchain:${Versions.vertx}"
    val vertxJsonSchema = "io.vertx:vertx-json-schema"
    val vertxRxJava = "io.vertx:vertx-rx-java3"
    val vertxWeb = "io.vertx:vertx-web"
    val vertxWebClient = "io.vertx:vertx-web-client"
}

object TestDependencies {
    val junitJupiter = "org.junit.jupiter:junit-jupiter:${Versions.junit}"
    val mockitoCore = "org.mockito:mockito-core:${Versions.mockito}"
    val mockitoInline = "org.mockito:mockito-inline:+"
    val mockitoJunit = "org.mockito:mockito-junit-jupiter:${Versions.mockito}"
    val vertxJunit = "io.vertx:vertx-junit5"
}
