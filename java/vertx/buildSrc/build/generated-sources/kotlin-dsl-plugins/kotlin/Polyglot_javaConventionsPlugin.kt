/**
 * Precompiled [polyglot.java-conventions.gradle.kts][Polyglot_java_conventions_gradle] script plugin.
 *
 * @see Polyglot_java_conventions_gradle
 */
public
class Polyglot_javaConventionsPlugin : org.gradle.api.Plugin<org.gradle.api.Project> {
    override fun apply(target: org.gradle.api.Project) {
        try {
            Class
                .forName("Polyglot_java_conventions_gradle")
                .getDeclaredConstructor(org.gradle.api.Project::class.java, org.gradle.api.Project::class.java)
                .newInstance(target, target)
        } catch (e: java.lang.reflect.InvocationTargetException) {
            throw e.targetException
        }
    }
}
