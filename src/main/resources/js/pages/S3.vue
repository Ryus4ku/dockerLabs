<template>
    <div>
        <div class="content">
            <div :style="{'marginBottom':20}">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="btn btn-info">Загрузить файл на сервер:</div>
                    </div>
                    <input type="file" class="form-control" @change="uploadFile"/>
                    <div v-if="sendFile" class="input-group-append">
                        <button class="btn btn-info"
                                type="button"
                                @click="onSend">Сохранить</button>
                    </div>
                    <div v-if="fr">
                        Url: <a :href="fr">{sendFile.name}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import aws from "aws-sdk";

    export default {
        name: "S3",
        data: () => ({
            awsConfig: {
                accessKeyId: 'vzfgP2zYJNbkse6WheBzsi',
                secretAccessKey: 'baqHyvfWuUU6NGuAw4MSnNp4GE9C8Zop722UCuR83JME',
                region: 'us-east-1"',
                endpoint: 'hb.bizmrg.com'
            },
            sendFile: null,
            fr: null,
            s3: null,
            bucketName: 'kapez'
        }),
        methods: {
            uploadFile(event) {
                event.preventDefault();
                const reader = new FileReader();
                const file = event.target.files[0];
                const sendFile = {
                    file,
                    name: file.name
                };

                reader.onloadend = () => this.sendFile = sendFile;

                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    this.sendFile = null;
                }
            },
            async onSend() {
                const Key = this.sendFile.name;
                const params = {
                    Bucket: this.bucketName,
                    Key,
                    Body: this.sendFile.file
                };

                await this.s3.putObject(params, err => {
                    if (err) {
                        alert(err.toString())
                    } else {
                        const url = this.s3.getSignedUrl('getObject', {
                            Bucket: this.bucketName, Key
                        });

                        this.fr = url;
                        alert(`Успешно загружено на ${this.bucketName}/${Key}<br>url:${url}`);
                    }
                });
            }
        },
        created() {
            aws.config.update(this.awsConfig);
            this.s3 = new aws.S3();
        }
    }
</script>

<style scoped>

</style>